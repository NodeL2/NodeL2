const ServerPacket = invoke('Packet/Server');

function userInfo(actor) {
    const packet = new ServerPacket(0x32);

    packet
        .writeD(actor.model.x)
        .writeD(actor.model.y)
        .writeD(actor.model.z)
        .writeD(0x00)  // Heading
        .writeD(actor.model.id)
        .writeS(actor.model.name)
        .writeD(actor.model.raceId)
        .writeD(actor.model.gender)
        .writeD(actor.model.classId)
        .writeD(actor.model.level)
        .writeD(actor.model.exp)
        .writeD(0x00)  // TODO: This is a hack, `exp` needs `writeQ`
        .writeD(actor.model.stats.str)
        .writeD(actor.model.stats.dex)
        .writeD(actor.model.stats.con)
        .writeD(actor.model.stats.int)
        .writeD(actor.model.stats.wit)
        .writeD(actor.model.stats.men)
        .writeD(actor.model.maxHp)
        .writeD(actor.model.hp)
        .writeD(actor.model.maxMp)
        .writeD(actor.model.mp)
        .writeD(actor.model.sp)
        .writeD(0x00)  // Load
        .writeD(actor.model.stats.weightLimit)
        .writeD(0x28); // ?

    for (let i = 0; i < 32; i++) { // Paperdoll
        packet
            .writeD(0x00);
    }

    packet
        .writeD(actor.model.stats.pAtk)
        .writeD(actor.model.stats.atkSpd)
        .writeD(actor.model.stats.pDef)
        .writeD(actor.model.stats.evasion)
        .writeD(actor.model.stats.accuracy)
        .writeD(actor.model.stats.critical)
        .writeD(actor.model.stats.mAtk)
        .writeD(actor.model.stats.castSpd)
        .writeD(actor.model.stats.speed)
        .writeD(actor.model.stats.mDef)
        .writeD(0x00)  // 1: Purple
        .writeD(actor.model.karma)
        .writeD(actor.model.speed.run)
        .writeD(actor.model.speed.walk)
        .writeD(actor.model.speed.swim)
        .writeD(actor.model.speed.swim)
        .writeD(0x00)  // Floating Run Speed
        .writeD(0x00)  // Floating Walk Speed
        .writeD(0x00)  // Flying Run Speed
        .writeD(0x00)  // Flying Walk Speed
        .writeF(1.0)   // Movement Multiplier
        .writeF(actor.model.stats.atkSpd / 277.77777777777777)  // Attack Speed Multiplier
        .writeF(actor.model.metrics.maleR)
        .writeF(actor.model.metrics.maleH)
        .writeD(actor.model.hairId)
        .writeD(actor.model.hairColor)
        .writeD(actor.model.face)
        .writeD(0x00)  // 1: GM
        .writeS(actor.model.title)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // Private Store Type
        .writeC(actor.model.canCraft)
        .writeD(actor.model.pk)
        .writeD(actor.model.pvp)
        .writeH(0x00)  // Cubic Count
        .writeC(0x00)  // 1: Find Party
        .writeD(0x00)  // Abnormal effect
        .writeC(0x00)  // ?
        .writeD(0x00)  // Clan privileges
        .writeH(actor.model.recRemain)
        .writeH(actor.model.recReceive)
        .writeD(0x00)  // ?
        .writeH(0x00)  // Inventory Limit
        .writeD(0x00)  // Class ID
        .writeD(0x00)  // Special effects
        .writeD(actor.model.maxCp)
        .writeD(actor.model.cp)
        .writeC(0x00)  // 1: Mounted
        .writeC(0x00)  // Team circle around feet 1: Blue, 2: Red
        .writeD(0x00)  // Clan Crest ID
        .writeC(0x00)  // 1: Noble
        .writeC(0x00)  // 1: Hero Aura
        .writeC(0x00)  // 1: Fishing Mode
        .writeD(0x00)  // Fishing x
        .writeD(0x00)  // Fishing y
        .writeD(0x00)  // Fishing z
        .writeD(0x00); // Name Color

    return packet.fetchBuffer();
}

module.exports = userInfo;
