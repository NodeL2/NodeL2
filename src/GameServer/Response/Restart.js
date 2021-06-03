let ServerPacket = invoke('ServerPacket');

function restart(player, targetId) {
    let text = 'What is this madness?';

    let packet = new ServerPacket(5 + ServerPacket.strlen(text));

    packet
        .writeC(0x74)
        .writeD(1)
        .writeS(text);

    return packet.buffer;
}

module.exports = restart;
