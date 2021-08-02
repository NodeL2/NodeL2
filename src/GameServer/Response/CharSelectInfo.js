let ServerPacket = invoke('ServerPacket');

function charSelectInfo(characters) {
    let packet = new ServerPacket(8); // 5

    packet
        .writeC(0x1f);

    return packet.buffer;
}

module.exports = charSelectInfo;
