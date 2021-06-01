let ServerPacket = invoke('ServerPacket');

function statusUpdate(id, hp, maxHp) {
    let packet = new ServerPacket(25);

    packet
        .writeC(0x1a)
        .writeD(id)
        .writeD(2)     // Attributes Count
        .writeD(0x09)  // HP ID
        .writeD(hp)    // HP Value
        .writeD(0x0a)  // Max HP ID
        .writeD(maxHp) // Max HP Value

    return packet.buffer;
}

module.exports = statusUpdate;
