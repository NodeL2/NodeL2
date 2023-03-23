const SendPacket = invoke('Packet/Send');

function stopMove(id, data) {
    const packet = new SendPacket(0x47);

    packet
        .writeD(id)
        .writeD(data.locX)
        .writeD(data.locY)
        .writeD(data.locZ)
        .writeD(data.head);

    return packet.fetchBuffer();
}

module.exports = stopMove;
