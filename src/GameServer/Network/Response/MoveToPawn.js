const SendPacket = invoke('Packet/Send');

function moveToPawn(actor, npc, distance) {
    const packet = new SendPacket(0x60);

    packet
        .writeD(actor.fetchId())
        .writeD(npc.fetchId())
        .writeD(distance)
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ());

    return packet.fetchBuffer();
}

module.exports = moveToPawn;
