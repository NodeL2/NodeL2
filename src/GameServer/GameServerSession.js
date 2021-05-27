// User define
let Config = require(__basedir + '/src/Config');
let Blowfish = require(__basedir + '/src/Blowfish');
let GameServerMethods = require(__basedir + '/src/GameServer/GameServerMethods');
let GameClientMethods = require(__basedir + '/src/GameServer/GameClientMethods');
let Utils = require(__basedir + '/src/Utils');

let storedCharacters = require(__basedir + '/Database.json');

class GameServerSession {
    constructor(socket) {
        this.socket = socket;
        this.data   = 0;
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
                this.data = GameClientMethods.protocolVersion(packet);

                if (Config.protocolVersion === this.data.protocolVersion) {
                    this.sendData(GameServerMethods.cryptInit(Config.xorKey), false);
                }
                break;

            case 0x08:
                this.data = GameClientMethods.requestAuthLogin(packet);

                if (Config.sessionKey.toString() === this.data.sessionKey.toString()) {
                    this.sendData(GameServerMethods.charSelectInfo(storedCharacters.characters), false);
                }
                break;

            case 0x0d:
                this.data = GameClientMethods.characterSelected(packet);
                this.sendData(GameServerMethods.characterSelected(storedCharacters.characters[1]), false);
                break;

            case 0x63:
                //RequestQuestList
                this.data = GameClientMethods.requestQuestList(packet);
                this.sendData(GameServerMethods.questList(), false);
                break;

            case 0x03:
                this.data = GameClientMethods.enterWorld(packet);
                this.sendData(GameServerMethods.userInfo(storedCharacters.characters[1]), false);
                break;

            case 0x01:
                this.data = GameClientMethods.moveBackwardToLocation(packet);
                this.sendData(GameServerMethods.moveToLocation(storedCharacters.characters[1].id, this.data), false);
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
