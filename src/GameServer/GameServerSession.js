// User define
let Config = require(__basedir + '/src/Config');
let Blowfish = require(__basedir + '/src/Blowfish');
let GameServerMethods = require(__basedir + '/src/GameServer/GameServerMethods');
let GameClientMethods = require(__basedir + '/src/GameServer/GameClientMethods');
let Actor = require(__basedir + '/src/Actor');
let Utils = require(__basedir + '/src/Utils');

let characterDB = require(__basedir + '/Database.json');

class GameServerSession {
    constructor(socket) {
        this.socket = socket;
        this.player = new Actor();
    }

    sendData(data, encrypt = true) {
        let header = new Buffer.from([0x00, 0x00]);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, encrypt ? Blowfish.encrypt(data) : data]) // encryptedPacket
        )
    }

    receiveData(data) {
        let packet = new Buffer.from(data, 'binary').slice(2);

        // Opcodes
        switch (packet[0]) {
            case 0x00: // Protocol Version
                GameClientMethods.protocolVersion(packet)
                    .then((data) => {

                        if (data.protocolVersion !== Config.protocolVersion) {
                            return;
                        }

                        this.sendData(
                            GameServerMethods.cryptInit(Config.xorKey), false
                        );
                    });
                break;

            case 0x01: // Move to Location
                GameClientMethods.moveBackwardToLocation(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerMethods.moveToLocation(this.player.id, data), false
                        );
                    });
                break;

            case 0x03: // Enter World
                GameClientMethods.enterWorld(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerMethods.userInfo(this.player), false
                        );
                    });
                break;

            case 0x08: // Authorize Login
                GameClientMethods.requestAuthLogin(packet)
                    .then((data) => {

                        if (data.sessionKey.isEqualTo(Config.sessionKey)) {
                            this.sendData(
                                GameServerMethods.charSelectInfo(characterDB.characters), false
                            );
                        }
                    });
                break;

            case 0x09: // Logout
                GameClientMethods.logout(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerMethods.logoutOk(), false
                        );
                    });
                break;

            case 0x0d: // Character Selected
                GameClientMethods.characterSelected(packet)
                    .then((data) => {

                        this.player.setProperties( // Set player properties
                            characterDB.characters[data.characterSlot]
                        );

                        this.sendData(
                            GameServerMethods.characterSelected(this.player), false
                        );
                    });
                break;

            case 0x63: // Quest List
                GameClientMethods.requestQuestList(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerMethods.questList(), false
                        );
                    });
                break;

            // case 0x0e:
            //     this.data = GameClientMethods.newCharacter(packet);
                
            //     if (this.data.status === 0x0e) {
            //         this.sendData(GameServerMethods.charTemplates(), false);
            //     }
            //     break;

            // case 0x0b:
            //     break;

            default:
                console.log('GS:: unknown opcode 0x%s', Utils.toHex(packet[0], 2));
                break;
        }
    }
}

module.exports = GameServerSession;
