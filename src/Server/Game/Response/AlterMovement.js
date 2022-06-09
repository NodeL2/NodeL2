const ServerPacket = invoke('Packet/Server');

function alterMovement(actorId, isWalking) {
    const packet = new ServerPacket(0x28);

    packet
        .writeD(actorId)
        .writeD(!isWalking)
        .writeD(0x00); // C2?

    return packet.fetchBuffer();
}

module.exports = alterMovement;
