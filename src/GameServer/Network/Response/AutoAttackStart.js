const SendPacket = invoke('Packet/Send');

function autoAttackStart(id) {
    const packet = new SendPacket(0x3b);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = autoAttackStart;
