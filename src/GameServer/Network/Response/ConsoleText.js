const SendPacket = invoke('Packet/Send');

function consoleText(textId, params) {
    const packet = new SendPacket(0x64);

    packet
        .writeD(textId)
        .writeD(utils.size(params))

    params.forEach((param) => {
        packet
            .writeD(param.kind)
            .writeD(param.value);
    });

    return packet.fetchBuffer();
}

module.exports = consoleText;
