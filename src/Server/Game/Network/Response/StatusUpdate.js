const SendPacket = invoke('Server/Packet/Send');

function statusUpdate(npc) {
    const packet = new SendPacket(0x0e);

    packet
        .writeD(npc.fetchId())
        .writeD(0x04)
        .writeD(0x09)
        .writeD(npc.fetchHp())
        .writeD(0x0a)
        .writeD(npc.fetchMaxHp())
        .writeD(0x0b)
        .writeD(npc.fetchMp())
        .writeD(0x0c)
        .writeD(npc.fetchMaxMp());

    return packet.fetchBuffer();
}

module.exports = statusUpdate;
