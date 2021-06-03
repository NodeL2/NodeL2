let ServerPacket = invoke('ServerPacket');

function inventory() {
    let packet = new ServerPacket(5 + (28 * 1));

    packet
        .writeC(0x27)
        .writeH(0x01)
        .writeH(0x01)  // Items amount
        .writeH(0)  // Type 1
        .writeD(268435572)  // Object ID
        .writeD(2369)  // Item ID
        .writeD(0x01)  // How many
        .writeH(0)  // Type 2
        .writeH(0xff)
        .writeH(0x00)  // Equipped = 0x01
        .writeD(128)  // Body part
        .writeH(0x00)  // Enchant level
        .writeH(0x00);

    return packet.buffer;
}

module.exports = inventory;
