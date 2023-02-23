const SendPacket = invoke('Server/Packet/Send');

function attack(actor, npcId) {
    const packet = new SendPacket(0x05);

    packet
        .writeD(actor.fetchId())
        .writeD(npcId)
        .writeD(1) // Damage
        .writeC(0) // Hit
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocX())
        .writeH(0);

    return packet.fetchBuffer();
}

module.exports = attack;
