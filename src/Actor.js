let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

class Actor {
    constructor() {
        this.isStanding = true;
        this.isRunning = true;
        this.inCombat = false;

        // this.npc = {
        //     id: -1,
        //     type: 'monster',
        //     isSelected: false,
        //     inCombat: false
        // };
    }

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

    select(session, data) {
        // Select NPC
        session.sendData(
            GameServerResponse.targetSelected(data.id), false
        );

        // Get NPC statistics
        let npc = World.fetchNpcWithId(data.id);

        if (npc !== undefined) {
            session.sendData(
                GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
            );
        }
    }

    move(session, data) {
        // Check if we're in combat mode
        if (session.player.inCombat) {
            session.sendData(
                GameServerResponse.attackCanceled(session.player), false
            );
            return;
        }

        session.sendData(
            GameServerResponse.moveToLocation(session.player.id, data), false
        );
    }

    attack(session, data) {
        // Check if we're in combat mode
        if (session.player.inCombat) {
            session.sendData(
                GameServerResponse.attackCanceled(session.player), false
            );
            return;
        }

        // Get NPC statistics
        let npc = World.fetchNpcWithId(data.id);

        if (npc !== undefined) {
            session.player.inCombat = true;

            // Select NPC
            session.sendData(
                GameServerResponse.targetSelected(data.id), false
            );

            // Update NPC statistics
            session.sendData(
                GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
            );

            // Attack NPC
            session.sendData(
                GameServerResponse.attack(session.player, data.id), false
            );

            setTimeout(function() { // Needs rework
                let hitDamage = 15 + Math.floor(Math.random() * 10);
                npc.hp = Math.max(0, npc.hp - hitDamage); // HP bar would disappear if less than zero

                session.sendData(
                    GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
                );

                session.sendData(
                    GameServerResponse.systemMessage(hitDamage), false
                );

                // Death of NPC
                if (npc.hp === 0) {
                    session.sendData(
                        GameServerResponse.die(npc.id), false
                    );

                    // Delete NPC from world
                    setTimeout(function() {
                        session.sendData(
                            GameServerResponse.deleteObject(npc.id), false
                        );
                    }, 5000);
                }
            }, 950); // Until hit point

            setTimeout(function() {
                session.player.inCombat = false;
            }, 1650); // Until end of combat
        }
    }
}

module.exports = Actor;
