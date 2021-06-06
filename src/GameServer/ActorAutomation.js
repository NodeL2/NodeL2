let GameServerResponse = invoke('GameServer/GameServerResponse');
let Utils = invoke('Utils');

class ActorAutomation {
    constructor() {
        this.timer = undefined;
        this.busy  = false;
    }

    requestMoveToNpc(session, target, callback) {
        // Abort, already in process
        if (this.busy) {
            session.sendData(
                GameServerResponse.actionFailed()
            );
            return;
        }

        // Check if we're OK for attack
        if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 5000) {
            callback();
            return;
        }

        this.busy = true;

        session.sendData(
            GameServerResponse.moveToPawn(session.player, target.id)
        );

        this.timer = setInterval(() => {
            if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 25000) {

                this.abortTimer();

                setTimeout(() => {
                    this.busy = false;
                    callback();
                }, 500);
            }
        }, 100);
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
            origin: {
                x: session.player.x,
                y: session.player.y,
                z: session.player.z,
            },
            target: {
                x: target.x,
                y: target.y,
                z: target.z,
            }
        };

        session.sendData(
            GameServerResponse.moveToLocation(session.player.id, coordinates)
        );

        this.timer = setInterval(() => {
            if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 25000) {

                this.abortTimer();

                setTimeout(() => {
                    this.busy = false;
                    callback();
                }, 500);
            }
        }, 100);
    }

    abortTimer() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    abort() {
        this.abortTimer();
        this.busy = false;
    }
}

module.exports = ActorAutomation;
