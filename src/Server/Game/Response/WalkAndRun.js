const ServerPacket = invoke('Packet/Server');

function walkAndRun(actorId, isWalking) {
    const packet = new ServerPacket(0x28);

    packet
        .writeD(actorId)
        .writeD(isWalking ? 0 : 1)
        .writeD(0x00); // C2?

    return packet.fetchBuffer();
}

module.exports = walkAndRun;
