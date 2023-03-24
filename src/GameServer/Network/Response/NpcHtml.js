const SendPacket = invoke('Packet/Send');

function npcHtml(id, html) {
    const packet = new SendPacket(0x1b);

    packet
        .writeD(id)
        .writeS(html)
        .writeD(0);

    return packet.fetchBuffer();
}

module.exports = npcHtml;
