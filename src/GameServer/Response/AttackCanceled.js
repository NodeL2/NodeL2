let ServerPacket = invoke('ServerPacket');

function attackCanceled(player) {
    let packet = new ServerPacket(5);

    packet
        .writeC(0x0a)
        .writeD(player.id);

    return packet.buffer;
}

module.exports = attackCanceled;
