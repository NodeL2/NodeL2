// User define
let ClientPacket = require(__basedir + '/src/ClientPacket');

class GameClientMethods {
    static protocolVersion(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD(); // Protocol Version

            callback({
                protocolVersion: packet.data[1]
            });
        }
    }

    static requestAuthLogin(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readS()
                .readD()
                .readD()
                .readD()
                .readD();

            callback({
                sessionKey: [
                    packet.data[3],
                    packet.data[2],
                ]
            });
        }
    }

    static characterSelected(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD();

            callback({
                characterSlot: packet.data[1]
            });
        }
    }

    static newCharacter(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC(); // Status

            callback({
                status: packet.data[0]
            });
        }
    }

    static requestQuestList(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC();

            callback({
            });
        }
    }

    static enterWorld(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC();

            callback({
            });
        }
    }

    static moveBackwardToLocation(buffer, callback) {
        if (callback) {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD()
                .readD()
                .readD()
                .readD()
                .readD()
                .readD();

            callback({
                origin: {
                    x: packet.data[4],
                    y: packet.data[5],
                    z: packet.data[6],
                },
                target: {
                    x: packet.data[1],
                    y: packet.data[2],
                    z: packet.data[3],
                }
            });
        }
    }
}

module.exports = GameClientMethods;
