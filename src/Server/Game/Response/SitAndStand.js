const ServerPacket = invoke('Packet/Server');

function sitAndStand(actorId, isSitting, locX, locY, locZ) {
    const packet = new ServerPacket(0x29);

    packet
        .writeD(actorId)
        .writeD(isSitting ? 0 : 1)
        .writeD(locX)
        .writeD(locY)
        .writeD(locZ);

    return packet.fetchBuffer();
}

module.exports = sitAndStand;
