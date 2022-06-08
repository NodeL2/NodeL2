const ServerPacket = invoke('Packet/Server');
const Utils        = invoke('Utils');

function userInfo(actor) {
    const packet = new ServerPacket(0x32);

    packet
        .writeD(actor.model.id)
        .writeD(0x00) // Size?
        .writeH(23)   // Sections?
        .writeB([-1, -1, -2])
        .writeD(0x00) // Relation

        .writeH(16 + Utils.textSize(actor.model.name))
        .writeT(actor.model.name)
        .writeC(actor.model.isGM)
        .writeC(actor.model.race)
        .writeC(actor.model.sex)
        .writeD(actor.model.baseId)
        .writeD(actor.model.classId)
        .writeC(actor.model.level)

        .writeH(18)
        .writeH(actor.model.stats.str)
        .writeH(actor.model.stats.dex)
        .writeH(actor.model.stats.con)
        .writeH(actor.model.stats.int)
        .writeH(actor.model.stats.wit)
        .writeH(actor.model.stats.men)
        .writeH(0x00) // ?
        .writeH(0x00) // ?

        .writeH(14)
        .writeD(actor.model.maxHp)
        .writeD(actor.model.maxMp)
        .writeD(actor.model.maxCp)

        .writeH(38)
        .writeD(actor.model.hp)
        .writeD(actor.model.mp)
        .writeD(actor.model.cp)
        .writeD(actor.model.sp)
        .writeD(0x00) // TODO: This is a hack, needs `writeQ`
        .writeD(actor.model.exp)
        .writeD(0x00) // TODO: This is a hack, needs `writeQ`
        .writeF(0.0)  // Exp. percent

        .writeH(4)
        .writeC(0x00) // Weapon Enchant
        .writeC(0x00) // Armor Set Enchant

        .writeH(15)
        .writeD(actor.model.hair)
        .writeD(actor.model.hairColor)
        .writeD(actor.model.face)
        .writeC(0x00) // Show Hair Accessory

        .writeH(6)
        .writeC(0x00) // Mount Type
        .writeC(0x00) // Private Store Type
        .writeC(actor.model.crafter)
        .writeC(0x00) // ?

        .writeH(56)
        .writeH(0x00) // ?
        .writeD(actor.model.stats.pAtk)
        .writeD(actor.model.stats.pAtkSpd)
        .writeD(actor.model.stats.pDef)
        .writeD(actor.model.stats.pEvasion)
        .writeD(actor.model.stats.pAccur)
        .writeD(actor.model.stats.pCritic)
        .writeD(actor.model.stats.mAtk)
        .writeD(actor.model.stats.mAtkSpd)
        .writeD(actor.model.stats.pAtkSpd)
        .writeD(actor.model.stats.mEvasion)
        .writeD(actor.model.stats.mDef)
        .writeD(actor.model.stats.mAccur)
        .writeD(actor.model.stats.mCritic)

        .writeH(14)
        .writeH(0x00) // Def. Fire
        .writeH(0x00) // Def. Water
        .writeH(0x00) // Def. Wind
        .writeH(0x00) // Def. Earth
        .writeH(0x00) // Def. Holy
        .writeH(0x00) // Def. Unholy

        .writeH(18)
        .writeD(actor.model.locX)
        .writeD(actor.model.locY)
        .writeD(actor.model.locZ)
        .writeD(0x00) // Vehicle ID

        .writeH(18)
        .writeH(actor.model.speed.run)
        .writeH(actor.model.speed.walk)
        .writeH(actor.model.speed.swim)
        .writeH(actor.model.speed.swim)
        .writeH(0x00) // ?
        .writeH(0x00) // ?
        .writeH(0x00) // ?
        .writeH(0x00) // ?

        .writeH(18)
        .writeF(1.0)  // Movement Multiplier
        .writeF(actor.model.stats.pAtkSpd / 277.77777777777777)

        .writeH(18)
        .writeF(actor.model.metrics.maleRadius)
        .writeF(actor.model.metrics.maleSize)

        .writeH(5)
        .writeC(0x00) // Atk. Element ID
        .writeH(0x00) // Atk. Element Value

        .writeH(32 + Utils.textSize(actor.model.title))
        .writeT(actor.model.title)
        .writeH(0x00) // Pledge Type
        .writeD(0x00) // Clan ID
        .writeD(0x00) // Large Clan Crest ID
        .writeD(0x00) // Clan Crest ID
        .writeD(0x00) // Clan?
        .writeC(0x00) // Clan Leader
        .writeD(0x00) // Ally ID
        .writeD(0x00) // Ally Crest ID
        .writeC(0x00) // Party Room?

        .writeH(22)
        .writeC(0x00) // PVP Flag
        .writeD(actor.model.reputation)
        .writeC(actor.model.isNoble)
        .writeC(actor.model.isHero)
        .writeC(0x00) // Pledge Class
        .writeD(actor.model.pk)
        .writeD(actor.model.pvp)
        .writeH(actor.model.recAvail)
        .writeH(actor.model.recReceive)

        .writeH(15)
        .writeD(0x00)
        .writeC(0x00)
        .writeD(0x00) // Fame ?
        .writeD(0x00)

        .writeH(9)
        .writeC(0x00) // Talismans?
        .writeC(0x00) // Jewels Limit?
        .writeC(0x00) // Team Ordinal?
        .writeC(0x00) // ?
        .writeC(0x00) // ?
        .writeC(0x00) // ?
        .writeC(0x00) // ?

        .writeH(4)
        .writeC(0x00) // Move Type
        .writeC(0x01) // Running

        .writeH(10)
        .writeD(0xffffff)
        .writeD(0x00) // Title Color

        .writeH(9)
        .writeH(0x00) // ?
        .writeH(0x00) // ?
        .writeH(0x00) // Inventory Limit
        .writeC(0x00) // ?

        .writeH(9)
        .writeC(0x01) // ?
        .writeH(0x00) // ?
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = userInfo;
