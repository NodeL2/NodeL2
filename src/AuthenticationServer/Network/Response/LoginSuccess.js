const SendPacket = invoke('Packet/Send');

function loginSuccess(session) {
    const packet = new SendPacket(0x03);

    packet
        .writeD(session.key1)
        .writeD(session.key2)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x02);

    return packet.fetchBuffer();
}

module.exports = loginSuccess;
