let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

class Actor {
    constructor() {
        this.isStanding = true;
        this.isRunning = true;
        this.inCombat = false;
        this.inWaitTypeSwitch = false;

        // Selected NPC (npc, mob, item)
        this.npc = undefined;

        this.items = [];
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

        this.paperdoll = {
            right: {
                hand: {
                    id: 0,
                    itemId: 0
                }
            },
            chest: {
                id: 0,
                itemId: 0
            },
            legs: {
                id: 0,
                itemId: 0
            }
        };

        Database.getInventoryItems(this.id)
            .then((rows) => {

                for (let row of rows) {
                    this.items.push({
                        id: 2000000 + row.id,
                        itemId: row.item_id,
                        bodyPart: row.body_part,
                        type1: row.type_1,
                        type2: row.type_2,
                        isEquipped: row.is_equipped
                    });

                    switch (row.body_part) {
                        case 128:
                            this.paperdoll.right.hand.id = row.id;
                            this.paperdoll.right.hand.itemId = row.item_id;
                            break;

                        case 1024:
                            this.paperdoll.chest.id = row.id;
                            this.paperdoll.chest.itemId = row.item_id;
                            break;

                        case 2048:
                            this.paperdoll.legs.id = row.id;
                            this.paperdoll.legs.itemId = row.item_id;
                            break;
                    }
                }
            });
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
        // Already selected?
        if (this.npc?.id === data.id) {
            // Is it an attackable monster?
            if (this.npc?.attackable && this.npc?.type === NpcType.MONSTER) {
                session.player.attack(session, data);
            }

            return;
        }

        // Select NPC
        session.sendData(
            GameServerResponse.targetSelected(data.id), false
        );

        // Get NPC statistics
        let npc = World.fetchNpcWithId(data.id);

        if (npc !== undefined) {
            this.npc = npc;

            session.sendData(
                GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
            );
        }
    }

    unselect(session, data) {
        this.npc = undefined;

        session.sendData(
            GameServerResponse.targetUnselected(session.player), false
        );
    }

    move(session, data) {
        // Check if we're already doing a task
        if (session.player.inCombat || session.player.inWaitTypeSwitch) {
            session.sendData(
                GameServerResponse.actionFailed(), false
            );
            return;
        }

        session.sendData(
            GameServerResponse.moveToLocation(session.player.id, data), false
        );
    }

    attack(session, data) {
        // Check if we're already doing a task
        if (session.player.inCombat || session.player.inWaitTypeSwitch) {
            session.sendData(
                GameServerResponse.actionFailed(), false
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

            setTimeout(() => { // Needs rework
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
                    World.removeNpcWithId(npc.id);

                    session.sendData(
                        GameServerResponse.die(npc.id), false
                    );

                    // Delete NPC from world
                    setTimeout(() => {
                        session.sendData(
                            GameServerResponse.deleteObject(npc.id), false
                        );
                    }, 5000);
                }
            }, 950); // Until hit point

            setTimeout(() => {
                session.player.inCombat = false;
            }, 1650); // Until end of combat
        }
    }

    action(session, data) {
        switch (data.actionId) {
            case 0: // Stand/Sit
                if (session.player.inWaitTypeSwitch) {
                    return;
                }

                session.player.inWaitTypeSwitch = true;
                session.player.isStanding = !session.player.isStanding;

                session.sendData(
                    GameServerResponse.changeWaitType(session.player), false
                );

                setTimeout(() => {
                    session.player.inWaitTypeSwitch = false;
                }, 3000);
                break;

            case 1: // Run/Walk
                session.player.isRunning = !session.player.isRunning;

                session.sendData(
                    GameServerResponse.changeMoveType(session.player), false
                );
                break;
        }
    }

    socialAction(session, data) {
        // Check if we're already doing a task
        if (session.player.inCombat || session.player.inWaitTypeSwitch || !session.player.isStanding) {
            return;
        }

        session.sendData(
            GameServerResponse.socialAction(session.player, data.actionId), false
        );
    }
}

module.exports = Actor;
