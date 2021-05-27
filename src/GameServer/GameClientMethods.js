// User define
let ClientPacket = require(__basedir + '/src/ClientPacket');

class GameClientMethods {
    static protocolVersion(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD(); // Protocol Version

        return {
            protocolVersion: packet.data[1]
        };
    }

    static requestAuthLogin(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readS()
            .readD()
            .readD()
            .readD()
            .readD();

        return {
            sessionKey: [
                packet.data[3],
                packet.data[2],
            ]
        };
    }

    static characterSelected(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC()
            .readD();

        return {
            slot: packet.data[1]
        };
    }

    static newCharacter(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC(); // Status

        return {
            status: packet.data[0]
        };
    }

    static requestQuestList(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC();

        return {
        };
    }

    static enterWorld(buffer) {
        let packet = new ClientPacket(buffer);

        packet
            .readC();

        return {
        };
    }
}

module.exports = GameClientMethods;
