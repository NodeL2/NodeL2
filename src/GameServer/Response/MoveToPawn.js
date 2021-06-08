let ServerPacket = invoke('ServerPacket');

function moveToPawn(player, targetId, radius) {
    let packet = new ServerPacket(25);

    packet
        .writeC(0x75)
        .writeD(player.id)
        .writeD(targetId)
        .writeD(20) // Distance
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z);

    return packet.buffer;
}

module.exports = moveToPawn;
