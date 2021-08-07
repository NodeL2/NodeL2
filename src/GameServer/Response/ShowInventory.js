let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function showInventory() {
    let packet = new ChroniclePacket(showInventory.name, 8); // 5

    packet
        .writeH(0x01)
        .writeH(0x00); // Items amount

    return packet.buffer;
}

module.exports = showInventory;
