let ServerPacket = invoke('ServerPacket');

function spawnItem(item) {
    let packet = new ServerPacket(29);

    packet
        .writeC(0x15)
        .writeD(item.id) // ID
        .writeD(item.itemId) // Item ID
        .writeD(item.x) // x
        .writeD(item.y) // y
        .writeD(-3430) // z
        .writeD(0)
        .writeD(1); // How many

    return packet.buffer;
}

module.exports = spawnItem;
