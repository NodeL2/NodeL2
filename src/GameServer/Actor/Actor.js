let ActorAutomation = invoke('GameServer/Actor/ActorAutomation');
let ActorInventory = invoke('GameServer/Actor/ActorInventory');
let ActorPaperdoll = invoke('GameServer/Actor/ActorPaperdoll');
let ActorState = invoke('GameServer/Actor/ActorState');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

class Actor {
    constructor() {
        this.state = new ActorState();
        this.automation = new ActorAutomation();
        this.inventory  = new ActorInventory();
        this.paperdoll  = new ActorPaperdoll();

        this.npcId = undefined;
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

        this.inventory.populate(this);
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
        if (this.id === data.id) { // Self selected
            this.unselect(session, data);
            session.sendData(GameServerResponse.targetSelected(this.id));
            return;
        }

        World.fetchNpcWithId(data.id)
        .then((npc) => { // Npc selected
            if (this.npcId === npc.id) {
                if (npc.type === NpcType.MONSTER && npc.attackable) {
                    this.automation.requestMoveToNpc(session, npc, () => {
                        this.automation.autoAttack(session, npc);
                    });
                }
                else {
                    // TODO: Some other non-attackable npc
                }
            }
            else {
                this.npcId = npc.id;
                session.sendData(GameServerResponse.targetSelected(npc.id));
                session.sendData(GameServerResponse.statusUpdate(npc.id, npc.hp, npc.maxHp));
            }
        })
        .catch(() => { // Pickup item
            if (this.state.isBusy(session)) {
                return;
            }

            let item = World.fetchItem(data.id);

            if (item !== undefined) {
                this.automation.requestMoveToItem(session, item, () => {
                    if (World.fetchItem(data.id)) { // Still available?
                        this.state.isPickingUp(true);

                        session.sendData(GameServerResponse.getItem(this, data));
                        session.sendData(GameServerResponse.deleteObject(data.id));
                        session.sendData(GameServerResponse.actionFailed());

                        setTimeout(() => {
                            this.state.isPickingUp(false);
                        }, 500);
                    }
                });
            }
        });
    }

    unselect(session, data) {
        this.npcId = undefined;
        session.sendData(GameServerResponse.targetUnselected(this));
    }

    move(session, data) {
        if (this.state.raw.isFighting) {
            this.automation.queueMovement(data);
        }

        if (this.state.isBusy(session)) {
            return;
        }

        this.automation.abort();

        session.sendData(GameServerResponse.moveToLocation(this.id, data));
    }

    action(session, data) {
        switch (data.actionId) {
            case 0: // Sit / Stand
                if (this.state.raw.isChangingWaitType || this.state.raw.isFighting) {
                    return;
                }

                this.automation.abort();

                this.state.isChangingWaitType(true);
                this.state.isSitting(!this.state.raw.isSitting);
                session.sendData(GameServerResponse.changeWaitType(this));

                setTimeout(() => {
                    this.state.isChangingWaitType(false);
                }, 3000);
                break;

            case 1: // Walk / Run
                this.state.isWalking(!this.state.raw.isWalking);
                session.sendData(GameServerResponse.changeMoveType(this));
                break;

            default:
                console.log('GS:: unknown action %d', data.actionId);
                break;
        }
    }

    socialAction(session, data) {
        if (this.state.isBusy(session)) {
            return;
        }

        session.sendData(GameServerResponse.socialAction(this.id, data.actionId));
    }
}

module.exports = Actor;
