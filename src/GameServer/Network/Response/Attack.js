const SendPacket = invoke('Packet/Send');

function attack(src, destId) {
    const packet = new SendPacket(0x05);

    packet
        .writeD(src.fetchId())
        .writeD(destId)
        .writeD(0x01) // Hit?
        .writeC(0x00) // Parameters?
        .writeD(src.fetchLocX())
        .writeD(src.fetchLocY())
        .writeD(src.fetchLocZ())
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = attack;
