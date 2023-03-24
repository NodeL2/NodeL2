const SendPacket = invoke('Packet/Send');

function destSelected(id, lvlDiff = 0) {
    const packet = new SendPacket(0x39);

    packet
        .writeD(id)
        .writeH(lvlDiff);

    return packet.fetchBuffer();
}

module.exports = destSelected;
