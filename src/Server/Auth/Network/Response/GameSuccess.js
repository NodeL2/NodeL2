const SendPacket = invoke('Server/Packet/Send');

function gameSuccess(session) {
    const packet = new SendPacket(0x07);

    packet
        .writeD(session.key1)  // Session Key (first)
        .writeD(session.key2); // Session Key (last)

    return packet.fetchBuffer();
}

module.exports = gameSuccess;
