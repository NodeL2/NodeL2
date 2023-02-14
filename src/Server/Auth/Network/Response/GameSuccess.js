const ServerPacket = invoke('Server/Packet/Server');

function gameSuccess(session) {
    const packet = new ServerPacket(0x07);

    packet
        .writeD(session.key1)  // Session Key (first)
        .writeD(session.key2); // Session Key (last)

    return packet.fetchBuffer();
}

module.exports = gameSuccess;
