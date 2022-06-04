const ServerPacket = invoke('Packet/Server');

function moveToLocation(id, coords) {
    const packet = new ServerPacket(0x2f);

    packet
        .writeD(id)
        .writeD(coords.to  .locX)
        .writeD(coords.to  .locY)
        .writeD(coords.to  .locZ)
        .writeD(coords.from.locX)
        .writeD(coords.from.locY)
        .writeD(coords.from.locZ);

    return packet.fetchBuffer();
}

module.exports = moveToLocation;
