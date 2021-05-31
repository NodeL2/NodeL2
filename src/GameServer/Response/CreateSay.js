let ServerPacket = invoke('ServerPacket');

function createSay(player, text, type) {
    let packet = new ServerPacket(9 + ServerPacket.strlen(player.name) + ServerPacket.strlen(text));

    packet
        .writeC(0x5d)
        .writeD(player.id)
        .writeD(type)
        .writeS(player.name)
        .writeS(text);

    return packet.buffer;
}

module.exports = createSay;
