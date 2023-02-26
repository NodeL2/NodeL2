const SendPacket = invoke('Packet/Send');

function questList() {
    const packet = new SendPacket(0x80);

    packet
        .writeH(0x00)
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = questList;
