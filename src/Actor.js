class Actor {
    setAccountID(username) {
        this.accountId = username;
    }

    setProperties(character) {
        this.id      = character.id;
        this.name    = character.name;
        this.title   = character.title || '';
        this.raceId  = character.race_id;
        this.classId = character.class_id;

        // Vitals
        this.level = character.level;
        this.maxHp = character.max_hp;
        this.hp    = character.hp;
        this.maxMp = character.max_mp;
        this.mp    = character.mp;
        this.exp   = character.exp;
        this.sp    = character.sp;
        this.karma = character.karma;

        // Appearance
        this.gender    = character.gender;
        this.face      = character.face;
        this.hairStyle = character.hair_style;
        this.hairColor = character.hair_color;

        // Position
        this.x = character.x;
        this.y = character.y;
        this.z = character.z;

        //
        this.isStanding = true;
        this.isRunning  = true;
    }
}

module.exports = Actor;
