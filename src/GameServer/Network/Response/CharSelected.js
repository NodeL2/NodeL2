const SendPacket = invoke('Packet/Send');

function charSelected(actor) {
    const packet = new SendPacket(0x15);

    packet
        .writeS(actor.fetchName())
        .writeD(actor.fetchId())
        .writeS(actor.fetchTitle())
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(actor.fetchSex())
        .writeD(actor.fetchRace())
        .writeD(actor.fetchClassId())
        .writeD(actor.fetchIsActive())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeF(actor.fetchHp())
        .writeF(actor.fetchMp())
        .writeD(actor.fetchSp())
        .writeD(actor.fetchExp())
        .writeD(actor.fetchLevel())
        .writeD(actor.fetchKarma())
        .writeD(actor.fetchPk())
        .writeD(actor.fetchInt())
        .writeD(actor.fetchStr())
        .writeD(actor.fetchCon())
        .writeD(actor.fetchMen())
        .writeD(actor.fetchDex())
        .writeD(actor.fetchWit());

    for (let i = 0; i < 32; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // Game time

    return packet.fetchBuffer();
}

module.exports = charSelected;
