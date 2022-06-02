const ServerPacket = invoke('Packet/Server');

function userInfo(actor) {
    const packet = new ServerPacket(0x32);

    packet
        .writeD(0x00)  // Actor ID
        .writeD(0x00)  // Init Size ?
        .writeH(23)    // ?
        .writeB(0x00); // Masks ?

    // Relation

    packet
        .writeD(0x00); // relation

    // Basic Info

    packet
        .writeH(14 + STRING)
        .writeS(actor.model.name)
        .writeC(0x00)  // Is GM?
        .writeC(actor.model.race)
        .writeC(actor.model.sex)
        .writeD(0x00)  // Base Class
        .writeD(actor.model.classId)
        .writeC(actor.model.level);

    // Base Stats

    packet
        .writeH(18)
        .writeH(actor.model.stats.str)
        .writeH(actor.model.stats.dex)
        .writeH(actor.model.stats.con)
        .writeH(actor.model.stats.int)
        .writeH(actor.model.stats.wit)
        .writeH(actor.model.stats.men)
        .writeH(0x00)  // ?
        .writeH(0x00); // ?

    // Max HP/MP/CP

    packet
        .writeH(14)
        .writeD(actor.model.maxHp)
        .writeD(actor.model.maxMp)
        .writeD(actor.model.maxCp);

    // Current HP/MP/CP/EXP/SP

    packet
        .writeH(38)
        .writeD(actor.model.hp)
        .writeD(actor.model.mp)
        .writeD(actor.model.cp)
        .writeD(actor.model.sp)
        .writeD(0x00)  // TODO: This is a hack, needs `writeQ`
        .writeD(actor.model.exp)
        .writeD(0x00)  // TODO: This is a hack, needs `writeQ`
        .writeF(0.0);  // Exp. percent

    // Enchant Level

    packet
        .writeH(4)
        .writeC(0x00)  // Weapon Enchant
        .writeC(0x00); // Armor Set Enchant

    // Appearance

    packet
        .writeH(15)
        .writeD(actor.model.hair)
        .writeD(actor.model.hairColor)
        .writeD(actor.model.face)
        .writeC(0x00); // Is Hair Accessory Enabled?

    // Status

    packet
        .writeH(6)
        .writeC(0x00)  // Mount Type
        .writeC(0x00)  // Private Store Type
        .writeC(actor.model.crafter)
        .writeC(0x00); // ?

    // Stats

    packet
        .writeH(56)
        .writeH(0x00)  // Weapon Flag
        .writeD(actor.model.stats.pAtk)
        .writeD(actor.model.stats.atkSpd)
        .writeD(actor.model.stats.pDef)
        .writeD(actor.model.stats.evasion)
        .writeD(actor.model.stats.accuracy)
        .writeD(actor.model.stats.critical)
        .writeD(actor.model.stats.mAtk)
        .writeD(actor.model.stats.castSpd)
        .writeD(actor.model.stats.speed)
        .writeD(0x00)  // mEvasion
        .writeD(actor.model.stats.mDef)
        .writeD(0x00)  // mAccuracy
        .writeD(0x00); // mCritical

    // Elementals

    packet
        .writeH(14)
        .writeH(0x00)  // Def. Fire
        .writeH(0x00)  // Def. Water
        .writeH(0x00)  // Def. Wind
        .writeH(0x00)  // Def. Earth
        .writeH(0x00)  // Def. Holy
        .writeH(0x00); // Def. Unholy

    // Position

    packet
        .writeH(18)
        .writeD(actor.model.x)
        .writeD(actor.model.y)
        .writeD(actor.model.z)
        .writeD(0x00); // Vehicle ID

    // Speed

    packet
        .writeH(18)
        .writeH(actor.model.speed.run)
        .writeH(actor.model.speed.walk)
        .writeH(actor.model.speed.swim)
        .writeH(actor.model.speed.swim)
        .writeH(0x00)  // ?
        .writeH(0x00)  // ?
        .writeH(0x00)  // ?
        .writeH(0x00); // ?

    // Multiplier

    packet
        .writeH(18)
        .writeF(1.0)   // Movement Multiplier
        .writeF(actor.model.stats.atkSpd / 277.77777777777777);

    // Radius/Size

    packet
        .writeH(18)
        .writeF(actor.model.metrics.maleRadius)
        .writeF(actor.model.metrics.maleSize);

    // Attack Elemental

    packet
        .writeH(5)
        .writeC(0x00)  // Atk. Element ID
        .writeH(0x00); // Atk. Element Value

    // Clan

    packet
        .writeH(30 + STRING)
        .writeS(actor.model.title)
        .writeH(0x00)  // Pledge Type
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // Large Clan Crest ID
        .writeD(0x00)  // Clan Crest ID
        .writeD(0x00)  // Clan ?
        .writeC(0x00)  // Clan Leader
        .writeD(0x00)  // Ally ID
        .writeD(0x00)  // Ally Crest ID
        .writeC(0x00); // Party Room ?

    // Social

    packet
        .writeH(22)
        .writeC(0x00)  // PVP Flag
        .writeD(actor.model.reputation)
        .writeC(0x00)  // Noble
        .writeC(0x00)  // Hero
        .writeC(0x00)  // Pledge Class
        .writeD(actor.model.pk)
        .writeD(actor.model.pvp)
        .writeH(actor.model.recRemain)
        .writeH(actor.model.recReceive);

    // Vital/Fame

    packet
        .writeH(15)
        .writeD(0x00)
        .writeC(0x00)
        .writeD(0x00)  // Fame ?
        .writeD(0x00);

    // Slots

    packet
        .writeH(9)
        .writeC(0x00)  // Talismans ?
        .writeC(0x00)  // Jewels Limit ?
        .writeC(0x00)  // Team Ordinal ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00); // ?

    // Movements

    packet
        .writeH(4)
        .writeC(0x00)  // Move Type
        .writeC(0x00); // Running

    // Color

    packet
        .writeH(10)
        .writeD(0x00)  // Name Color
        .writeD(0x00); // Title Color

    // Inventory Limit

    packet
        .writeH(9)
        .writeH(0x00)  // ?
        .writeH(0x00)  // ?
        .writeH(0x00)  // Inventory Limit
        .writeC(0x00); // ?

    // Unknown 3

    packet
        .writeH(9)
        .writeC(0x01)  // ?
        .writeH(0x00)  // ?
        .writeD(0x00); // ?

    return packet.fetchBuffer();
}

module.exports = userInfo;
