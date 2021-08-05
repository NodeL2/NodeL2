let ServerPacket = invoke('ServerPacket');

function questList() {
    let packet = new ServerPacket(8);

    packet
        .writeC(0x98)
        .writeH(0x00)
        .writeH(0x00);

    return packet.buffer;
}

module.exports = questList;
