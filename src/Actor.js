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

        this.paperdoll = {};
        this.paperdoll[BodyPart.RIGHT_HAND] = { id: 0, itemId: 0 };
        this.paperdoll[BodyPart.CHEST]      = { id: 0, itemId: 0 };
        this.paperdoll[BodyPart.LEGS]       = { id: 0, itemId: 0 };

        Database.getInventoryItems(this.id)
            .then((rows) => {

                for (let row of rows) {
                    this.items.push({
                        id: 2000000 + row.id,
                        itemId: row.item_id,
                        category: row.category,
                        bodyPart: row.body_part,
                        type1: row.type_1,
                        type2: row.type_2,
                        isEquipped: row.is_equipped
                    });

                    // Paperdoll equipment
                    if (row.is_equipped) {
                        this.paperdoll[row.body_part].id = 2000000 + row.id;
                        this.paperdoll[row.body_part].itemId = row.item_id;
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

    isBusy() {
        if (this.inCombat || this.isPickingUp || this.inWaitTypeSwitch || !this.isStanding) {
            session.sendData(
                GameServerResponse.actionFailed(), false
            );
            return true;
        }
        return false;
    }

    select(session, data) {
        if (World.fetchNpcWithId(data.id)) {
            // Already selected?
            if (this.npc?.id === data.id) {
                // Is it an attackable monster?
                if (this.npc?.attackable && this.npc?.type === NpcType.MONSTER) {
                    this.attack(session, data);
                }
            }
            else {
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
        }
        else {
            if (this.isBusy()) {
                return;
            }

            this.isPickingUp = true;

            session.sendData(
                GameServerResponse.getItem(this, data), false
            );

            session.sendData(
                GameServerResponse.deleteObject(data.id), false
            );

            session.sendData(
                GameServerResponse.actionFailed(), false
            );

            setTimeout(() => {
                this.isPickingUp = false;
            }, 750);
        }
    }

    unselect(session, data) {
        this.npc = undefined;

        session.sendData(
            GameServerResponse.targetUnselected(this), false
        );
    }

    move(session, data) {
        if (this.isBusy()) {
            return;
        }

        session.sendData(
            GameServerResponse.moveToLocation(this.id, data), false
        );
    }

    attack(session, data) {
        if (this.isBusy()) {
            return;
        }

        // Get NPC statistics
        let npc = World.fetchNpcWithId(data.id);

        if (npc !== undefined) {
            this.inCombat = true;

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
                GameServerResponse.attack(this, data.id), false
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
                    World.removeNpcWithId(session, npc.id);
                }
            }, 950); // Until hit point

            setTimeout(() => {
                this.inCombat = false;
            }, 1650); // Until end of combat
        }
    }

    action(session, data) {
        switch (data.actionId) {
            case 0: // Stand/Sit
                if (this.inWaitTypeSwitch) {
                    return;
                }

                this.inWaitTypeSwitch = true;
                this.isStanding = !this.isStanding;

                session.sendData(
                    GameServerResponse.changeWaitType(this), false
                );

                setTimeout(() => {
                    this.inWaitTypeSwitch = false;
                }, 3000);
                break;

            case 1: // Run/Walk
                this.isRunning = !this.isRunning;

                session.sendData(
                    GameServerResponse.changeMoveType(this), false
                );
                break;
        }
    }

    socialAction(session, data) {
        if (this.isBusy()) {
            return;
        }

        session.sendData(
            GameServerResponse.socialAction(this, data.actionId), false
        );
    }

    useItem(session, id) {
        // Find item use/equip
        let item = this.items.find(obj =>
            obj.id === id
        );

        if (item !== undefined) {
            if (item.category === WearableItemType.WEAPON || item.category === WearableItemType.ARMOR) {
                // Unequip previous item
                this.unequipBodyPart(session, item.bodyPart);

                // Equip paperdoll
                this.paperdoll[item.bodyPart].id = item.id;
                this.paperdoll[item.bodyPart].itemId = item.itemId;

                item.isEquipped = true;
            }
            else {
                // TODO: Consumables
            }
        }
    }

    unequipBodyPart(session, bodyPart) {
        // Find item and set as unequipped
        let item = this.items.find(obj =>
            obj.id === this.paperdoll[bodyPart].id
        );

        if (item !== undefined) {
            // Unequip from paperdoll
            this.paperdoll[bodyPart].id = 0;
            this.paperdoll[bodyPart].itemId = 0;

            item.isEquipped = false;

            // Move item to the end
            this.items = this.items.filter(obj =>
                obj.id !== item.id
            );

            this.items.push(item);
        }
    }
}

module.exports = Actor;
