const SendPacket = invoke('Server/Packet/Send');

function itemsList() {
    const packet = new SendPacket(0x1b);

    packet
        .writeH(0x01)
        .writeH(0x00); // Items amount

    return packet.fetchBuffer();
}

module.exports = itemsList;
