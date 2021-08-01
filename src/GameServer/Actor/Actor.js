let ActorAutomation = invoke('GameServer/Actor/ActorAutomation');
let ActorInventory = invoke('GameServer/Actor/ActorInventory');
let ActorModel = invoke('GameServer/Actor/ActorModel');
let ActorPaperdoll = invoke('GameServer/Actor/ActorPaperdoll');
let ActorState = invoke('GameServer/Actor/ActorState');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

class Actor {
    constructor() {
        this.automation = new ActorAutomation();
        this.inventory  = new ActorInventory();
        this.model      = new ActorModel();
        this.paperdoll  = new ActorPaperdoll();
        this.state      = new ActorState();

        this.npcId = undefined;
    }

    select(session, data) {
        if (this.id === data.id) { // Click on self
            this.unselect(session, data);
            session.sendData(GameServerResponse.targetSelected(this.id));
            return;
        }

        World.fetchNpcWithId(data.id)
        .then((npc) => { // Npc selected
            if (this.npcId === npc.id) { // Second click on same NPC
                this.automation.moveTowardsNpc(session, npc, () => {
                    if (npc.type === NpcType.MONSTER && npc.attackable) {
                        this.automation.autoAttack(session, npc);
                    }
                    else {
                        // TODO: Some other non-attackable npc
                        console.log('GS:: Run towards non-attackable npc');
                    }
                });
            }
            else { // First click on a NPC
                this.npcId = npc.id;
                session.sendData(GameServerResponse.targetSelected(npc.id));
                session.sendData(GameServerResponse.statusUpdate(npc.id, npc.hp, npc.maxHp));
            }
        })
        .catch(() => { // Pickup item
            if (this.state.isBusy(session)) {
                return;
            }

            World.fetchItem(data.id)
            .then((item) => {
                this.automation.moveTowardsItem(session, item, () => {
                    this.state.isPickingUp(true);

                    session.sendData(GameServerResponse.getItem(this.id, item));
                    session.sendData(GameServerResponse.deleteObject(item.id));
                    session.sendData(GameServerResponse.actionFailed());

                    setTimeout(() => {
                        this.state.isPickingUp(false);
                    }, 500);
                });
            })
            .catch(() => {
                // TODO: Unlikely
                console.log('GS:: You shouldn\'t pickup a non-item');
            });
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
