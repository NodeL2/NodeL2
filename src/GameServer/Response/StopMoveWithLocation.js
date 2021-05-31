let ServerPacket = invoke('ServerPacket');

function stopMoveWithLocation(player) {
    let packet = new ServerPacket(17);

    packet
        .writeC(0x5f)
        .writeD(player.id)
        .writeD(player.x)
        .writeD(player.y)
        .writeD(player.z);

    return packet.buffer;
}

module.exports = stopMoveWithLocation;
