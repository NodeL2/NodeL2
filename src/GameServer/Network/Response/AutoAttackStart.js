const SendPacket = invoke('Packet/Send');

function autoAttackStart(id) {
    const packet = new SendPacket(0x2b);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = autoAttackStart;
