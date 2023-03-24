const SendPacket = invoke('Packet/Send');

function revive(id) {
    const packet = new SendPacket(0x0c);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = revive;
