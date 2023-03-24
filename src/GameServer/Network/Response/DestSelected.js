const SendPacket = invoke('Packet/Send');

function destSelected(srcId, dstId) {
    const packet = new SendPacket(0x39);

    packet
        .writeD(srcId)
        .writeD(dstId)
        .writeD(0x00)  // X
        .writeD(0x00)  // Y
        .writeD(0x00); // Z

    return packet.fetchBuffer();
}

module.exports = destSelected;
