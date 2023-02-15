const SendPacket = invoke('Server/Packet/Send');

function destSelected(destId) {
    const packet = new SendPacket(0xa6);

    packet
        .writeD(destId)
        .writeH(0x00); // Mob color based on level difference

    return packet.fetchBuffer();
}

module.exports = destSelected;
