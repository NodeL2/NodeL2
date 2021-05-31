// User define
let Config = invoke('Config');
let Database = invoke('Database');
let Blowfish = invoke('Blowfish');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let GameClientMethods = invoke('GameServer/GameClientMethods');
let Actor = invoke('Actor');
let Utils = invoke('Utils');

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

                        if (data.protocolVersion === Config.protocolVersion) {
                            this.sendData(
                                GameServerResponse.cryptInit(Config.xorKey), false
                            );
                        }
                    });
                break;

            case 0x01: // Move to Location
                GameClientMethods.moveBackwardToLocation(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerResponse.moveToLocation(this.player.id, data), false
                        );
                    });
                break;

            case 0x03: // Enter World
                GameClientMethods.enterWorld(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerResponse.sunrise(), false
                        );

                        this.sendData(
                            GameServerResponse.userInfo(this.player), false
                        );
                    });
                break;

            case 0x08: // Authorize Login
                GameClientMethods.requestAuthLogin(packet)
                    .then((data) => {

                        if (data.sessionKey.isEqualTo(Config.sessionKey)) {
                            this.player.setAccountID(data.username);

                            Database.getCharacters(this.player.accountId)
                                .then((rows) => {

                                    this.sendData(
                                        GameServerResponse.charSelectInfo(rows), false
                                    );
                                });
                        }
                    });
                break;

            case 0x09: // Logout
                GameClientMethods.logout(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerResponse.logoutOk(), false
                        );
                    });
                break;

            case 0x0b: // Create Character
                GameClientMethods.characterCreate(packet)
                    .then((data) => {

                        Database.addNewCharacter(this.player.accountId, data)
                            .then(() => {

                                this.sendData(
                                    GameServerResponse.charCreateSuccess(), false
                                );

                                Database.getCharacters(this.player.accountId)
                                    .then((rows) => {

                                        this.sendData(
                                            GameServerResponse.charSelectInfo(rows), false
                                        );
                                    });
                            });
                    });
                break;

            case 0x0d: // Character Selected
                GameClientMethods.characterSelected(packet)
                    .then((data) => {

                        Database.getCharacters(this.player.accountId)
                            .then((rows) => {

                                this.player.setProperties( // Set player properties
                                    rows[data.characterSlot]
                                );
        
                                this.sendData(
                                    GameServerResponse.charSelected(this.player), false
                                );
                            });
                    });
                break;

            case 0x0e: // New Character
                GameClientMethods.newCharacter(packet)
                    .then((data) => {

                        if (data.status === 0x0e) {
                            this.sendData(
                                GameServerResponse.charTemplates(), false
                            );
                        }
                    });
                break;

            case 0x0f: // Show Inventory
                GameClientMethods.showInventory(packet)
                    .then(() => {

                        this.sendData(
                            GameServerResponse.inventory(), false
                        )
                    });
                break;

            case 0x45: // Request Action Use
                GameClientMethods.requestActionUse(packet)
                    .then((data) => {
                        
                        switch (data.actionId) {
                            case 0: // Stand/Sit
                                this.player.isStanding = !this.player.isStanding;

                                this.sendData(
                                    GameServerResponse.changeWaitType(this.player), false
                                );
                                break;

                            case 1: // Run/Walk
                                this.player.isRunning = !this.player.isRunning;

                                this.sendData(
                                    GameServerResponse.changeMoveType(this.player), false
                                );
                                break;
                        }
                    });
                break;

            case 0x46: // Restart?
                break;

            case 0x63: // Quest List
                GameClientMethods.requestQuestList(packet)
                    .then((data) => {

                        this.sendData(
                            GameServerResponse.questList(), false
                        );
                    });
                break;

            default:
                console.log('GS:: unknown opcode 0x%s', Utils.toHex(packet[0], 2));
                break;
        }
    }
}

module.exports = GameServerSession;
