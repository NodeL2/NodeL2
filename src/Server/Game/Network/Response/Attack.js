const SendPacket = invoke('Server/Packet/Send');

function attack(actor, npcId) {
    const packet = new SendPacket(0x05);

    packet
        .writeD(actor.fetchId())
        .writeD(npcId)
        .writeD(0x01) // ?
        .writeC(0x00) // ?
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocX())
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = attack;
