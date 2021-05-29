// User define
let ClientPacket = invoke('ClientPacket');
let Utils = invoke('Utils');

class AuthClientMethods {
    static authorizeLogin(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readB(14)  // Username
                .readB(16); // Password

            return success({
                username: Utils.toAsciiStripNull(packet.data[1]),
                password: Utils.toAsciiStripNull(packet.data[2]),
            });
        });
    }

    static serverList(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD()  // Session Key (first)
                .readD(); // Session Key (last)

            return success({
                sessionKey: [
                    packet.data[1],
                    packet.data[2],
                ]
            });
        });
    }

    static gameLogin(buffer) {
        return new Promise((success, _) => {
            let packet = new ClientPacket(buffer);

            packet
                .readC()
                .readD()  // Session Key (first)
                .readD()  // Session Key (last)
                .readC(); // Server ID

            return success({
                sessionKey: [
                    packet.data[1],
                    packet.data[2],
                ],
                serverID: packet.data[3]
            });
        });
    }
}

module.exports = AuthClientMethods;
