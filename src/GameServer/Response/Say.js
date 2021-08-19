let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function say(player, text, type) {
    let packet = new ChroniclePacket(say.name);

    packet
        .writeD(player.model.id)
        .writeD(type)
        .writeS(player.model.name)
        .writeS(text);

    return packet.fetchBuffer();
}

module.exports = say;
