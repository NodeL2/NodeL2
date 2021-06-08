let ServerPacket = invoke('ServerPacket');

function stopMoveWithLocation(player) {
    let packet = new ServerPacket(17);

    packet
        .writeC(0x5f)
        .writeD(player.id)
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z);

    return packet.buffer;
}

module.exports = stopMoveWithLocation;
