class Actor {
    setAccountID(username) {
        this.accountId = username;
    }

    setProperties(character) {
        this.id = character.id;
        this.name = character.name;
        this.title = character.title || '';
        this.raceId = character.race_id;
        this.classId = character.class_id;

        // Vitals
        this.level = character.level;
        this.hp = character.hp;
        this.mp = character.mp;
        this.exp = character.exp;
        this.sp = character.sp;
        this.karma = character.karma;

        // Appearance
        this.gender = character.gender;
        this.face = character.face;
        this.hairStyle = character.hair_style;
        this.hairColor = character.hair_color;

        // Position
        this.x = character.x;
        this.y = character.y;
        this.z = character.z;
        this.heading = 0; // ?

        //
        this.isStanding = true;
        this.isRunning = true;
    }

    setBaseStats(stats) {
        this.maxHp = stats.hp;
        this.maxMp = stats.mp;

        this.pAtk = stats.p_atk;
        this.pDef = stats.p_def;
        this.mAtk = stats.m_atk;
        this.mDef = stats.m_def;
        this.accuracy = stats.accuracy;
        this.evasion = stats.evasion;
        this.critical = stats.critical;
        this.speed = stats.speed;
        this.atkSpeed = stats.atk_speed;
        this.castingSpd = stats.casting_spd;

        this.str = stats.str;
        this.dex = stats.dex;
        this.con = stats.con;
        this.int = stats.int;
        this.wit = stats.wit;
        this.men = stats.men;

        this.groundSpdLow = stats.ground_spd_low;
        this.groundSpdHigh = stats.ground_spd_high;
        this.waterSpd = stats.water_spd;
        this.weightLimit = stats.weight_limit;
        this.canCraft = stats.can_craft;

        if (this.gender === 0) {
            this.collisionRadius = stats.male_radius;
            this.collisionHeight = stats.male_height;
        }
        else {
            this.collisionRadius = stats.female_radius;
            this.collisionHeight = stats.female_height;
        }
    }
}

module.exports = Actor;
