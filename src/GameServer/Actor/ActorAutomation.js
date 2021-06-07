let GameServerResponse = invoke('GameServer/GameServerResponse');
let Utils = invoke('Utils');
let World = invoke('GameServer/World');

class ActorAutomation {
    constructor() {
        this.timer = undefined;
        this.busy  = false;

        this.previousDistance = 0;
        this.failsafe = 0;

        this.move = undefined;
    }

    queueMovement(data) {
        this.move = data;
    }

    autoAttack(session, data) {
        World.fetchNpcWithId(data.id)
        .then((npc) => {
            if (npc.hp === 0) {
                session.player.state.isFighting(false);
                return;
            }

            const speed = 500000 / session.player.atkSpeed;
            session.sendData(GameServerResponse.attack(session.player, npc.id));
            session.player.state.isFighting(true);

            setTimeout(() => { // Needs rework
                let hitDamage = 15 + Math.floor(Math.random() * 10);
                npc.hp = Math.max(0, npc.hp - hitDamage); // HP bar would disappear if less than zero

                session.sendData(GameServerResponse.statusUpdate(npc.id, npc.hp, npc.maxHp));
                session.sendData(GameServerResponse.systemMessage(hitDamage));

                // Death of NPC
                if (npc.hp === 0) {
                    World.removeNpcWithId(session, npc.id);
                }
            }, speed * 0.644); // Until hit point

            setTimeout(() => {
                if (npc.hp === 0 || this.move) {
                    session.player.state.isFighting(false);
                    if (this.move) {
                        session.player.move(session, this.move);
                        this.move = undefined;
                    }
                    return;
                }
                this.autoAttack(session, data);
            }, speed); // Until end of combat
        });
    }

    requestMoveToNpc(session, npc, callback) {
        if (session.player.state.isBusy(session) || this.busy) {
            return;
        }

        // Check if we're OK for attack
        if (Utils.distance(session.player.x, session.player.y, npc.x, npc.y) < 5000) {
            callback();
            return;
        }

        this.busy = true;

        session.sendData(
            GameServerResponse.moveToPawn(session.player, npc.id)
        );

        this.timer = setInterval(() => {
            let distance  = Utils.distance(session.player.x, session.player.y, npc.x, npc.y);
            this.failsafe = distance === this.previousDistance ? (this.failsafe + 1) : 0;

            if (this.failsafe >= 15) {
                this.abort();
                callback();
            }

            this.previousDistance = distance;
        }, 100);

        // this.timer = setInterval(() => {
        //     console.log(Utils.distance(session.player.x, session.player.y, target.x, target.y));
        //     if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 25000) {

        //         this.abortTimer();

        //         setTimeout(() => {
        //             this.busy = false;
        //             callback();
        //         }, 1000);
        //     }
        // }, 100);
    }

    requestMoveToItem(session, target, callback) {
        // Abort, already in progress
        if (this.busy) {
            session.sendData(
                GameServerResponse.actionFailed()
            );
            return;
        }

        // Check if we're OK for pickup
        if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 5000) {
            callback();
            return;
        }

        this.busy = true;

        const coordinates = {
            origin: session.player,
            target: target
        };

        session.sendData(
            GameServerResponse.moveToLocation(session.player.id, coordinates)
        );

        this.timer = setInterval(() => {
            let distance  = Utils.distance(session.player.x, session.player.y, target.x, target.y);
            this.failsafe = distance === this.previousDistance ? (this.failsafe + 1) : 0;

            if (this.failsafe >= 15) {
                this.abort();
                callback();
            }

            this.previousDistance = distance;
        }, 100);

        // this.timer = setInterval(() => {
        //     if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 25000) {

        //         this.abortTimer();

        //         setTimeout(() => {
        //             this.busy = false;
        //             callback();
        //         }, 1000);
        //     }
        // }, 100);
    }

    abortTimer() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    abort() {
        this.abortTimer();
        this.busy = false;
        this.previousDistance = 0;
        this.failsafe = 0;
    }
}

module.exports = ActorAutomation;
