const SendPacket = invoke('Packet/Send');

function attack(src, destId, params) {
    const packet = new SendPacket(0x06);

    packet
        .writeD(src.fetchId())
        .writeD(destId)
        .writeD(0x01) // Hit?
        .writeC(params)
        .writeD(src.fetchLocX())
        .writeD(src.fetchLocY())
        .writeD(src.fetchLocZ())
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = attack;
