const ServerResponse = invoke('GameServer/Network/Response');
const ActorModel     = invoke('GameServer/Model/Actor');
const World          = invoke('GameServer/World');
const Backpack       = invoke('GameServer/Backpack');
const Database       = invoke('Database');

class Actor extends ActorModel {
    constructor(data) {
        // Parent inheritance
        super(data);

        // Specific
        this.backpack = new Backpack(data);
        delete this.model.items;
        delete this.model.paperdoll;

        this.npcId = undefined;
    }

    moveTo(session, coords) {
        if (this.isBusy(session)) {
            return;
        }

        this.abortScheduleTimer();
        session.dataSend(ServerResponse.moveToLocation(this.fetchId(), coords));
    }

    updatePosition(session, coords) {
        this.setLocXYZH(coords);
        (World.npc.spawns.filter(ob => utils.withinRadius(coords.locX, coords.locY, ob.fetchLocX(), ob.fetchLocY(), 2500)) ?? []).forEach((npc) => {
            session.dataSend(ServerResponse.npcInfo(npc));
        });

         // TODO: Write less in DB about movement
        Database.updateCharacterLocation(this.fetchId(), coords);
    }

    select(session, data, ctrl = false) {
        if (this.fetchId() === data.id) { // Click on self
            this.unselect(session);
            session.dataSend(ServerResponse.destSelected(data.id));
            return;
        }

        World.fetchNpcWithId(data.id).then((npc) => { // Npc selected
            if (npc.fetchId() !== this.npcId) { // First click on Npc
                this.npcId = npc.fetchId();
                session.dataSend(ServerResponse.destSelected(this.npcId));
                this.statusUpdateVitals(session, npc);
            }
            else { // Second click on same Npc
                if (this.isBusy(session)) {
                    return;
                }

                this.scheduleArrival(session, this, npc, 20, () => {
                    this.updatePosition(session, {
                        locX: npc .fetchLocX(),
                        locY: npc .fetchLocY(),
                        locZ: npc .fetchLocZ(),
                        head: this.fetchHead(),
                    });

                    World.fetchNpcWithId(this.npcId).then((npc) => {
                        if (npc.fetchAttackable() || ctrl) {
                            this.automation.meleeHit(session, npc);
                        }
                        else {
                            World.npcTalk(session, npc);
                        }
                    }).catch((e) => {
                        utils.infoWarn('GameServer:: npc not found (1) -> ' + e);
                        this.unselect(session);
                    });
                });
            }
        }).catch((e) => { // Pickup item
            utils.infoWarn('GameServer:: npc not found (2) -> ' + e);
            this.unselect(session);
        });
    }

    unselect(session) {
        this.npcId = undefined;
        session.dataSend(ServerResponse.destDeselected(this));
    }

    requestedSkillAction(session, data) {
        if (this.npcId === undefined) {
            return;
        }

        if (this.isBusy(session)) {
            return;
        }

        World.fetchNpcWithId(this.npcId).then((npc) => {
            this.scheduleArrival(session, this, npc, data.distance, () => {
                if (npc.fetchAttackable() || data.ctrl) { // TODO: Else, find which `response` fails the attack
                    this.automation.remoteHit(session, npc, data);
                }
            });
        }).catch((e) => {
            utils.infoWarn('GameServer:: npc not found (3) -> ' + e);
            this.unselect(session);
        });
    }

    basicAction(session, data) {
        if (this.state.fetchOnTheMove()) {
            return;
        }

        switch (data.actionId) {
        case 0x00: // Sit / Stand
            if (this.state.fetchCasts() || this.state.fetchCombats() || this.state.fetchOccupied()) {
                return;
            }

            this.state.setOccupied(true);
            this.state.setSeated(!this.state.fetchSeated());
            session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setOccupied(false);
            }, 2000); // TODO: How to calculate this, based on what?
            break;

        case 0x01: // Walk / Run
            this.state.setWalkin(!this.state.fetchWalkin());
            session.dataSend(
                ServerResponse.walkAndRun(this)
            );
            break;

        case 0x28: // Recommend without selection
            break;

        default:
            utils.infoWarn('GameServer:: unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
        }
    }

    socialAction(session, actionId) {
        if (this.isBusy(session)) {
            return;
        }

        if (this.state.fetchOnTheMove()) {
            return;
        }

        this.abortScheduleTimer();
        session.dataSend(ServerResponse.socialAction(this.fetchId(), actionId));
    }

    unstuck(session) {
        if (this.isBusy(session)) {
            return;
        }

        const coords = {
            locX: 80304, locY: 56241, locZ: -1500, head: this.fetchHead()
        };

        this.abortScheduleTimer();
        session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));

        // TODO: Hide this from the world, soon. Utter stupid.
        setTimeout(() => {
            this.updatePosition(session, coords);
        });
    }

    admin(session) {
        session.dataSend(
            ServerResponse.npcHtml(this.fetchId(), utils.parseRawFile('data/Html/Default/admin.html'))
        );
    }

    fetchEquippedWeapon() {
        return this.backpack.fetchItems().find(ob => ob.kind === 'Weapon' && ob.equipped);
    }
}

module.exports = Actor;
