const ServerPacket = invoke('Packet/Server');

function moveToLocation(actorId, data) {
    const packet = new ServerPacket(0x2f);

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
