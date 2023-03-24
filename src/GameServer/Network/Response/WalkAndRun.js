const SendPacket = invoke('Packet/Send');

function walkAndRun(creatureId, movement) {
    const packet = new SendPacket(0x3e);

    packet
        .writeD(creatureId)
        .writeD(movement);

    return packet.fetchBuffer();
}

module.exports = walkAndRun;
