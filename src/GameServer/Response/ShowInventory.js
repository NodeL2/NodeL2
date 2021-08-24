let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function showInventory() {
    let packet = new ChroniclePacket(showInventory.name);

    packet
        .writeH(0x01)
        .writeH(0x00); // Items amount

    return packet.fetchBuffer();
}

module.exports = showInventory;
