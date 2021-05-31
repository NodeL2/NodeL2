let ServerPacket = invoke('ServerPacket');

function changeWaitType(player) {
    let packet = new ServerPacket(21);

    packet
        .writeC(0x3f)
        .writeD(player.id)
        .writeD(player.isStanding)
        .writeD(player.x)
        .writeD(player.y)
        .writeD(player.z);

    return packet.buffer;
}

module.exports = changeWaitType;
