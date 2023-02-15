const SendPacket = invoke('Server/Packet/Send');

function skillStarted(actor, skillId) {
    const packet = new SendPacket(0x48);

    packet
        .writeD(actor.fetchId())
        .writeD(actor.fetchId())
        .writeD(skillId)
        .writeD(0x01)
        .writeD(1000)
        .writeD(1000)
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = skillStarted;
