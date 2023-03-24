const SendPacket = invoke('Packet/Send');

function autoAttackStop(id) {
    const packet = new SendPacket(0x2c);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = autoAttackStop;
