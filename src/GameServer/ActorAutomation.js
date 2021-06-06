let GameServerResponse = invoke('GameServer/GameServerResponse');
let Utils = invoke('Utils');

class ActorAutomation {
    constructor() {
        this.timer = undefined;
    }

    requestMoveToNpc(session, target, radius, callback) {
        // Abort, already in progress
        if (this.timer) {
            session.sendData(
                GameServerResponse.actionFailed()
            );
            return;
        }

        // Check distance from Npc
        if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 5000) {
            callback();
            return;
        }

        session.sendData(
            GameServerResponse.moveToPawn(session.player, target.id)
        );

        this.timer = setInterval(() => {
            if (Utils.distance(session.player.x, session.player.y, target.x, target.y) < 25000) {
                setTimeout(() => {
                    this.abort();
                    callback();
                }, 500);
            }
        }, 100);
    }

    requestMoveToItem(session, target, radius, callback) {
        // Abort, already in progress
        if (this.timer) {
            session.sendData(
                GameServerResponse.actionFailed()
            );
            return;
        }

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
            //console.log('playerX:%d, targetX:%d, playerY:%d, targetY:%d', session.player.x, target.x, session.player.y, target.y);
            if (Utils.isWithinRadius(session.player.x, session.player.y, target.x, target.y, radius)) {
                console.log(1);
                this.abort();
                callback();
            }
        }, 100);
    }

    abort() {
        clearInterval(this.timer);
        this.timer = undefined;
    }
}

module.exports = ActorAutomation;
