class Actor {
    setProperties(character) {
        this.id        = character.id;
        this.accountId = character.accountId;
        this.name      = character.name;
        this.title     = character.title;
        this.raceId    = character.raceId;
        this.classId   = character.classId;

        // Vitals
        this.level = character.level;
        this.maxHp = character.maxHp;
        this.hp    = character.hp;
        this.maxMp = character.maxMp;
        this.mp    = character.mp;
        this.exp   = character.exp;
        this.sp    = character.sp;
        this.karma = character.karma;

        // Appearance
        this.gender    = character.gender;
        this.face      = character.face;
        this.hairStyle = character.hairStyle;
        this.hairColor = character.hairColor;

        // Position
        this.x = character.x;
        this.y = character.y;
        this.z = character.z;
    }
}

module.exports = Actor;
