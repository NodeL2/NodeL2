const ServerPacket = invoke('Packet/Server');

function alterMovement(actor) {
    const packet = new ServerPacket(0x28);

    packet
        .writeD(actor.model.id)
        .writeD(0x00)  // Walk: 0, Run: 1
        .writeD(0x00); // C2?

    return packet.fetchBuffer();
}

module.exports = alterMovement;
