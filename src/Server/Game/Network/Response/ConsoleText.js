const SendPacket = invoke('Server/Packet/Send');

function consoleText(id, hit) {
    const packet = new SendPacket(0x64);

    packet
        .writeD(id)
        .writeD(1)  // Number of texts
        .writeD(1)  // ?
        .writeD(hit);

    return packet.fetchBuffer();
}

module.exports = consoleText;
