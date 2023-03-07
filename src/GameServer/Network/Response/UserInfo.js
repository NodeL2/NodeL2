const SendPacket = invoke('Packet/Send');

function userInfo(actor) {
    const packet = new SendPacket(0x04);

    packet
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeD(actor.fetchHead())
        .writeD(actor.fetchId())
        .writeS(actor.fetchName())
        .writeD(actor.fetchRace())
        .writeD(actor.fetchSex())
        .writeD(actor.fetchClassId())
        .writeD(actor.fetchLevel())
        .writeD(actor.fetchExp())
        .writeD(actor.fetchStr())
        .writeD(actor.fetchDex())
        .writeD(actor.fetchCon())
        .writeD(actor.fetchInt())
        .writeD(actor.fetchWit())
        .writeD(actor.fetchMen())
        .writeD(actor.fetchMaxHp())
        .writeD(actor.fetchHp())
        .writeD(actor.fetchMaxMp())
        .writeD(actor.fetchMp())
        .writeD(actor.fetchSp())
        .writeD(actor.backpack.fetchTotalLoad())
        .writeD(actor.fetchMaxLoad())
        .writeD(0x28); // ?

        for (let i = 0; i < 15; i++) {
            packet
                .writeD(actor.backpack.fetchPaperdollId(i));
        }

        for (let i = 0; i < 15; i++) {
            packet
                .writeD(actor.backpack.fetchPaperdollSelfId(i));
        }

    packet
        .writeD(actor.fetchPAtk())
        .writeD(actor.fetchAtkSpd())
        .writeD(actor.fetchPDef())
        .writeD(actor.fetchEvasion())
        .writeD(actor.fetchAccur())
        .writeD(actor.fetchCrit())
        .writeD(actor.fetchMAtk())
        .writeD(actor.fetchCastSpd())
        .writeD(actor.fetchSpeed())
        .writeD(actor.fetchMDef())
        .writeD(0x00)  // Purple = 0x01
        .writeD(actor.fetchKarma())
        .writeD(actor.fetchRun())
        .writeD(actor.fetchWalk())
        .writeD(actor.fetchSwim())
        .writeD(actor.fetchSwim())
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.0)   // Movement Multiplier
        .writeF(actor.fetchAtkSpd() / 277.77777777777777)
        .writeF(actor.fetchRadius())
        .writeF(actor.fetchSize())
        .writeD(actor.fetchHair())
        .writeD(actor.fetchHairColor())
        .writeD(actor.fetchFace())
        .writeD(actor.fetchIsGM())
        .writeS(actor.fetchTitle())
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // Private Store Type
        .writeC(actor.fetchIsCrafter())
        .writeD(actor.fetchPk())
        .writeD(actor.fetchPvp())
        .writeH(0x00)  // Cubic Count
        .writeC(0x00)  // Find Party Members = 0x01
        .writeD(0x00)  // Is invisible?
        .writeC(0x00)  // ?
        .writeD(0x00)  // Clan Privileges
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeH(actor.fetchRecRemain())
        .writeH(actor.fetchEvalScore());

    return packet.fetchBuffer();
}

module.exports = userInfo;
