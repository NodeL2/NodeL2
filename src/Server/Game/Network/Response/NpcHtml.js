const SendPacket = invoke('Server/Packet/Send');

function npcHtml(id, html) {
    const packet = new SendPacket(0x0f);

    packet
        .writeD(id)
        .writeS(html)
        .writeD(0);

    return packet.fetchBuffer();
}

module.exports = npcHtml;
