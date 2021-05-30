// User define
let ClientPacket = invoke('ClientPacket');

class GameClientMethods {
    static protocolVersion(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD(); // Protocol Version

            return success({
                protocolVersion: packet.data[1]
            });
        });
    }

    static requestAuthLogin(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readS()
                .readD()
                .readD()
                .readD()
                .readD();

            return success({
                username: packet.data[1],
                sessionKey: [
                    packet.data[3],
                    packet.data[2],
                ]
            });
        });
    }

    static logout(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC();

            return success({
            });
        });
    }

    static characterSelected(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD();

            return success({
                characterSlot: packet.data[1]
            });
        });
    }

    static newCharacter(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC(); // Status

            return success({
                status: packet.data[0]
            });
        });
    }

    static characterCreate(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readS()  // Name
                .readD()  // Race
                .readD()  // Gender
                .readD()  // Class ID
                .readD()
                .readD()
                .readD()
                .readD()
                .readD()
                .readD()
                .readD()  // Hair Style
                .readD()  // Hair Color
                .readD(); // Face

            return success({
                name: packet.data[1],
                race: packet.data[2],
                gender: packet.data[3],
                classId: packet.data[4],
                hairStyle: packet.data[11],
                hairColor: packet.data[12],
                face: packet.data[13]
            });
        });
    }

    static requestQuestList(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC();

            return success({
            });
        });
    }

    static enterWorld(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC();

            return success({
            });
        });
    }

    static moveBackwardToLocation(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD()
                .readD()
                .readD()
                .readD()
                .readD()
                .readD();

            return success({
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
        });
    }

    static showInventory(buffer) {
        return new Promise((success) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC();

            return success({
            });
        });
    }

    static requestActionUse(buffer) {
        return new Promise((success) => {
            let packet = new ClientPacket(buffer);
            
            packet
                .readC()
                .readD()  // Action ID
                .readD()
                .readC();

            return success({
                actionId: packet.data[1]
            });
        });
    }
}

module.exports = GameClientMethods;
