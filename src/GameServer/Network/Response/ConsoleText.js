const SendPacket = invoke('Packet/Send');

function consoleText(textId, params = []) {
    const packet = new SendPacket(0x64);

    packet
        .writeD(textId)
        .writeD(params.length)

    for (const param of params) {
        packet
            .writeD(0x01)
            .writeD(param.value);
    }

    return packet.fetchBuffer();
}

module.exports = consoleText;
