let ServerPacket = invoke('ServerPacket');

function statusUpdate(id, hp, maxHp) {
    let packet = new ServerPacket(25);

    packet
        .writeC(0x1a)
        .writeD(id)
        .writeD(2)
        .writeD(0x09)
        .writeD(hp)
        .writeD(0x0a)
        .writeD(maxHp);

    return packet.buffer;
}

module.exports = statusUpdate;
