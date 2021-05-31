let ServerPacket = invoke('ServerPacket');

function inventory() {
    let packet = new ServerPacket(5);

    packet
        .writeC(0x27)
        .writeH(0x01)
        .writeH(0x00);

    return packet.buffer;
}

module.exports = inventory;
