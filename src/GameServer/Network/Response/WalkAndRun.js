const SendPacket = invoke('Packet/Send');

function walkAndRun(creatureId, movement) {
    const packet = new SendPacket(0x2e);

    packet
        .writeD(creatureId)
        .writeD(movement)
        .writeD(0x00); // C2?

    return packet.fetchBuffer();
}

module.exports = walkAndRun;
