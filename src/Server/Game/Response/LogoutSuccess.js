const ServerPacket = invoke('Packet/Server');

function logoutSuccess() {
    const packet = new ServerPacket(0x84);

    return packet.fetchBuffer();
}

module.exports = logoutSuccess;
