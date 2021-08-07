let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function logoutSuccess() {
    let packet = new ChroniclePacket(logoutSuccess.name, 8); // 1

    return packet.buffer;
}

module.exports = logoutSuccess;
