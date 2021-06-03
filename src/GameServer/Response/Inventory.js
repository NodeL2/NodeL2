let ServerPacket = invoke('ServerPacket');

function inventory(player) {
    let packet = new ServerPacket(5 + (28 * player.items.length));

    packet
        .writeC(0x27)
        .writeH(0x01)
        .writeH(player.items.length); // Items amount

    for (item of player.items) {
        packet
            .writeH(item.type1) // Type 1
            .writeD(item.id) // Object ID
            .writeD(item.itemId) // Item ID
            .writeD(0x01) // How many
            .writeH(item.type2) // Type 2
            .writeH(0xff)
            .writeH(item.isEquipped) // Equipped = 0x01
            .writeD(item.bodyPart) // Body part
            .writeH(0x00) // Enchant level
            .writeH(0x00);
    }

    return packet.buffer;
}

module.exports = inventory;
