let ServerPacket = invoke('ServerPacket');

function targetUnselected(player) {
    let packet = new ServerPacket(21);

    packet
        .writeC(0x3a)
        .writeD(player.id)
        .writeD(player.x)
        .writeD(player.y)
        .writeD(player.z)
        .writeD(player.id);

    return packet.buffer;
}

module.exports = targetUnselected;
