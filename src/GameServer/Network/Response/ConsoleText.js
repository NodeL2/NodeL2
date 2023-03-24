const SendPacket = invoke('Packet/Send');

function consoleText(textId, params) {
    const packet = new SendPacket(0x7a);

    packet
        .writeD(textId)
        .writeD(params.length)

    for (const param of params) {
        packet
            .writeD(param.kind)
            .writeD(param.value);
    }

    return packet.fetchBuffer();
}

module.exports = consoleText;
