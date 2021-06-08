class ActorModel {
    parseBasicInfo(player, info) {
        player.id      = info.id;
        player.name    = info.name;
        player.title   = info.title || '';
        player.raceId  = info.race_id;
        player.classId = info.class_id;

        // Vitals
        this.level = info.level;
        this.hp    = info.hp;
        this.mp    = info.mp;
        this.exp   = info.exp;
        this.sp    = info.sp;
        this.karma = info.karma;

        // Appearance
        this.gender    = info.gender;
        this.face      = info.face;
        this.hairStyle = info.hair_style;
        this.hairColor = info.hair_color;

        // Position
        this.x = info.x;
        this.y = info.y;
        this.z = info.z;
    }

    parseStatisticsInfo(player, info) {
        this.maxHp = info.hp;
        this.maxMp = info.mp;

        this.pAtk = info.p_atk;
        this.pDef = info.p_def;
        this.mAtk = info.m_atk;
        this.mDef = info.m_def;

        this.accuracy   = info.accuracy;
        this.evasion    = info.evasion;
        this.critical   = info.critical;
        this.speed      = info.speed;
        this.atkSpeed   = info.atk_speed;
        this.castingSpd = info.casting_spd;

        this.str = info.str;
        this.dex = info.dex;
        this.con = info.con;
        this.int = info.int;
        this.wit = info.wit;
        this.men = info.men;

        this.groundSpdLow  = info.ground_spd_low;
        this.groundSpdHigh = info.ground_spd_high;
        this.waterSpd      = info.water_spd;
        this.weightLimit   = info.weight_limit;

        if (this.gender === 0) {
            this.collisionRadius = info.male_radius;
            this.collisionHeight = info.male_height;
        }
        else {
            this.collisionRadius = info.female_radius;
            this.collisionHeight = info.female_height;
        }

        this.canCraft = info.can_craft;
    }
}

module.exports = ActorModel;
