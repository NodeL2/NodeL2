let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function logoutSuccess() {
    let packet = new ChroniclePacket(logoutSuccess.name);

    return packet.fetchBuffer();
}

module.exports = logoutSuccess;
