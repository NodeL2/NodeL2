const Utils = require("../Utils");

let ActorAutomation = invoke('GameServer/ActorAutomation');
let Database = invoke('Database');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let Paperdoll = invoke('GameServer/Paperdoll');
let World = invoke('GameServer/World');

class Actor {
    constructor() {
        this.paperdoll = new Paperdoll();
        this.automation = new ActorAutomation();
        this.npcId = undefined;
        this.items = [];

        this.state = {
            isChangingWaitType : false,
            isFighting         : false,
            isMoving           : false,
            isPickingUp        : false,
            isSitting          : false,
            isWalking          : false,
        };
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

        Database.getInventoryItems(this.id)
            .then((rows) => {

                for (let row of rows) {
                    this.items.push({
                        id: 2000000 + row.id,
                        itemId: row.item_id,
                        category: row.category,
                        bodyPartId: row.body_part,
                        type1: row.type_1,
                        type2: row.type_2,
                        isEquipped: row.is_equipped
                    });
                }

                for (let item of this.items) {
                    if (item.isEquipped) {
                        this.paperdoll.equip(item.bodyPartId, item.id, item.itemId);
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

    isBusy(session) {
        if (this.state.isChangingWaitType || this.state.isFighting || this.state.isPickingUp || this.state.isSitting) {
            session.sendData(
                GameServerResponse.actionFailed()
            );
            return true;
        }
        return false;
    }

    select(session, data) {
        if (this.id === data.id) {
            this.unselect(session, data);
            session.sendData(
                GameServerResponse.targetSelected(this.id)
            );
            return;
        }

        let worldNpc = World.fetchNpcWithId(data.id);

        if (worldNpc !== undefined) {
            // Already selected?
            if (this.npcId === worldNpc.id) {
                // Is it an attackable monster?
                if (worldNpc.attackable && worldNpc.type === NpcType.MONSTER) {
                    this.automation.requestMoveToNpc(session, worldNpc, () => {
                        this.attack(session, data);
                    });
                }
            }
            else {
                this.npcId = worldNpc.id;

                session.sendData(
                    GameServerResponse.targetSelected(worldNpc.id)
                );

                session.sendData(
                    GameServerResponse.statusUpdate(worldNpc.id, worldNpc.hp, worldNpc.maxHp)
                );
            }
        }
        else {
            if (this.isBusy(session)) {
                return;
            }

            let item = World.fetchItem(data.id);

            if (item !== undefined) {

                this.automation.requestMoveToItem(session, item, () => {

                    if (World.fetchItem(data.id)) { // Still available?
                        this.state.isPickingUp = true;

                        session.sendData(
                            GameServerResponse.getItem(this, data)
                        );

                        session.sendData(
                            GameServerResponse.deleteObject(data.id)
                        );

                        session.sendData(
                            GameServerResponse.actionFailed()
                        );

                        setTimeout(() => {
                            this.state.isPickingUp = false;
                        }, 750);
                    }
                });
            }
        }
    }

    unselect(session, data) {
        this.npcId = undefined;

        session.sendData(
            GameServerResponse.targetUnselected(this)
        );
    }

    move(session, data) {
        if (this.isBusy(session)) {
            return;
        }

        this.automation.abort();

        session.sendData(
            GameServerResponse.moveToLocation(this.id, data)
        );
    }

    attack(session, data) {
        if (this.isBusy(session)) {
            return;
        }

        this.automation.abort();

        let worldNpc = World.fetchNpcWithId(data.id);

        if (worldNpc !== undefined) {
            if (worldNpc.hp === 0) {
                return;
            }

            this.state.isFighting = true;

            session.sendData(
                GameServerResponse.attack(this, worldNpc.id)
            );

            let singleAttackCycle = 500000 / this.atkSpeed;

            setTimeout(() => { // Needs rework
                let hitDamage = 15 + Math.floor(Math.random() * 10);
                worldNpc.hp = Math.max(0, worldNpc.hp - hitDamage); // HP bar would disappear if less than zero

                session.sendData(
                    GameServerResponse.statusUpdate(worldNpc.id, worldNpc.hp, worldNpc.maxHp)
                );

                session.sendData(
                    GameServerResponse.systemMessage(hitDamage)
                );

                // Death of NPC
                if (worldNpc.hp === 0) {
                    World.removeNpcWithId(session, worldNpc.id);
                }
            }, singleAttackCycle * 0.644); // Until hit point

            setTimeout(() => {
                this.state.isFighting = false;
            }, singleAttackCycle); // Until end of combat
        }
    }

    action(session, data) {
        switch (data.actionId) {
            case 0: // Sit / Stand
                if (this.state.isChangingWaitType) {
                    return;
                }

                this.automation.abort();

                this.state.isChangingWaitType = true;
                this.state.isSitting = !this.state.isSitting;

                session.sendData(
                    GameServerResponse.changeWaitType(this)
                );

                setTimeout(() => {
                    this.state.isChangingWaitType = false;
                }, 3000);
                break;

            case 1: // Walk / Run
                this.state.isWalking = !this.state.isWalking;

                session.sendData(
                    GameServerResponse.changeMoveType(this)
                );
                break;

            default:
                console.log('GS:: unknown action %d', data.actionId);
                break;
        }
    }

    socialAction(session, data) {
        if (this.isBusy(session)) {
            return;
        }

        session.sendData(
            GameServerResponse.socialAction(this.id, data.actionId)
        );
    }

    useItem(session, id) {
        // Find item use/equip
        let item = this.items.find(obj =>
            obj.id === id
        );

        if (item !== undefined) {
            if (item.category === WearableItemType.WEAPON || item.category === WearableItemType.ARMOR) {
                this.unequipBodyPart(session, item.bodyPartId);
                this.paperdoll.equip(item.bodyPartId, item.id, item.itemId);
                item.isEquipped = true;
            }
            else {
                // TODO: Consumables
            }
        }
    }

    unequipBodyPart(session, bodyPartId) {
        // Find item and set as unequipped
        let item = this.items.find(obj =>
            obj.id === this.paperdoll.raw[bodyPartId].id
        );

        if (item !== undefined) {
            this.paperdoll.unequip(bodyPartId);
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
