let ServerPacket = invoke('ServerPacket');

function die(id) {
    let packet = new ServerPacket(29);

    packet
        .writeC(0x0b)
        .writeD(id)
        .writeD(1)
        .writeD(1)
        .writeD(1)
        .writeD(1)
        .writeD(0)
        .writeD(1);

    return packet.buffer;
}

module.exports = die;
