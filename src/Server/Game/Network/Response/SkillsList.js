const SendPacket = invoke('Server/Packet/Send');

function skillsList() {
    const packet = new SendPacket(0x6d);

    packet
        .writeD(0x00); // Skills amount

    return packet.fetchBuffer();
}

module.exports = skillsList;
