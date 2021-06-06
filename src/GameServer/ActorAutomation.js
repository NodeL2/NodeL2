let GameServerResponse = invoke('GameServer/GameServerResponse');
let Utils = invoke('Utils');

class ActorAutomation {
    constructor() {
        this.timer = undefined;
    }

    requestMove(session, origin, target, radius, callback) {
        // Abort, already in progress
        if (this.timer) {
            session.sendData(
                GameServerResponse.actionFailed()
            );
            return;
        }

        const coordinates = {
            origin: {
                x: origin.x,
                y: origin.y,
                z: origin.z,
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
            if (Utils.isWithinRadius(session.player.x, session.player.y, target.x, target.y, radius)) {

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
