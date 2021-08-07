let ChroniclePacket = invoke('GameServer/ChroniclePacket');
let Utils           = invoke('Utils');

function say(player, text, type) {
    let packet = new ChroniclePacket(
        say.name,
        9 + Utils.textLength(player.model.name) + Utils.textLength(text)
    );

    packet
        .writeD(player.model.id)
        .writeD(type)
        .writeS(player.model.name)
        .writeS(text);

    return packet.buffer;
}

module.exports = say;
