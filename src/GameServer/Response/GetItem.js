let ServerPacket = invoke('ServerPacket');

function getItem(playerId, item) {
    let packet = new ServerPacket(21);

    packet
        .writeC(0x17)
        .writeD(playerId)
        .writeD(item.id)
        .writeD(item.x)
        .writeD(item.y)
        .writeD(item.z);

    return packet.buffer;
}

module.exports = getItem;
