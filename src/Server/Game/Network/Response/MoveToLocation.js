const SendPacket = invoke('Server/Packet/Send');

function moveToLocation(actorId, data) {
    const packet = new SendPacket(0x01);

    packet
        .writeD(actorId)
        .writeD(data.to.locX)
        .writeD(data.to.locY)
        .writeD(data.to.locZ)
        .writeD(data.from.locX)
        .writeD(data.from.locY)
        .writeD(data.from.locZ);

    return packet.fetchBuffer();
}

module.exports = moveToLocation;
