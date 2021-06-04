let ServerPacket = invoke('ServerPacket');

function spawnItem(id, x, y) {
    let packet = new ServerPacket(29);

    packet
        .writeC(0x15)
        .writeD(2000100 + id) // ID
        .writeD(426) // Item ID
        .writeD(x) // x
        .writeD(y) // y
        .writeD(-3430) // z
        .writeD(0)
        .writeD(1); // How many

    return packet.buffer;
}

module.exports = spawnItem;
