let ServerPacket = invoke('ServerPacket');

function targetUnselected(player) {
    let packet = new ServerPacket(21);

    packet
        .writeC(0x3a)
        .writeD(player.id)  // Object ID
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z)
        .writeD(player.id); // Target ID

    return packet.buffer;
}

module.exports = targetUnselected;
