const SendPacket = invoke('Server/Packet/Send');

function loginSuccess(session) {
    const packet = new SendPacket(0x03);

    packet
        .writeD(session.key1) // Session Key (first)
        .writeD(session.key2) // Session Key (last)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x02);

    return packet.fetchBuffer();
}

module.exports = loginSuccess;
