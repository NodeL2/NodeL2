const SendPacket = invoke('Server/Packet/Send');

function moveToLocation(actorId, coords) {
    const packet = new SendPacket(0x01);

    packet
        .writeD(actorId)
        .writeD(coords.to.locX)
        .writeD(coords.to.locY)
        .writeD(coords.to.locZ)
        .writeD(coords.from.locX)
        .writeD(coords.from.locY)
        .writeD(coords.from.locZ);

    return packet.fetchBuffer();
}

module.exports = moveToLocation;
