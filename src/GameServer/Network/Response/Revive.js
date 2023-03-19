const SendPacket = invoke('Packet/Send');

function revive(id) {
    const packet = new SendPacket(0x07);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = revive;
