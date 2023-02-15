const SendPacket = invoke('Server/Packet/Send');

function speak(actor, data) {
    const packet = new SendPacket(0x4a);

    packet
        .writeD(actor.fetchId())
        .writeD(data.kind)
        .writeS(actor.fetchName())
        .writeS(data.text);

    return packet.fetchBuffer();
}

module.exports = speak;
