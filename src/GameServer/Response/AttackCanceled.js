let ServerPacket = invoke('ServerPacket');

function attackCanceled(playerId) {
    let packet = new ServerPacket(5);

    packet
        .writeC(0x0a)
        .writeD(playerId);

    return packet.buffer;
}

module.exports = attackCanceled;
