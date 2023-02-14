const SendPacket = invoke('Server/Packet/Send');

function stopMove(actorId, data) {
    const packet = new SendPacket(0x47);

    packet
        .writeD(actorId)
        .writeD(data.locX)
        .writeD(data.locY)
        .writeD(data.locZ)
        .writeD(data.head);

    return packet.fetchBuffer();
}

module.exports = stopMove;
