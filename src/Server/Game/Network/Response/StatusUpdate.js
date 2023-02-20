const SendPacket = invoke('Server/Packet/Send');

function statusUpdate(npc) {
    const packet = new SendPacket(0x0e);

    packet
        .writeD(npc.fetchId())
        .writeD(0x02)
        .writeD(0x09)
        .writeD(npc.fetchHp())
        .writeD(0x0a)
        .writeD(npc.fetchMaxHp());

    return packet.fetchBuffer();
}

module.exports = statusUpdate;
