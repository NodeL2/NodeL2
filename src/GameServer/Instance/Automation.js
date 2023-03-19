const ServerResponse = invoke('GameServer/Network/Response');
const SelectedModel  = invoke('GameServer/Model/Selected');
const DataCache      = invoke('GameServer/DataCache');
const Formulas       = invoke('GameServer/Formulas');

class Automation extends SelectedModel {
    constructor() {
        // Parent inheritance
        super();

        this.timer = { // TODO: Move this into actual GameServer timer
            replenish : undefined,
            action    : undefined,
            pickup    : undefined,
        };

        this.ticksPerSecond = 10;
    }

    destructor(creature) {
        this.clearDestId();
        this.stopReplenish();
        this.abortAll(creature);
    }

    replenishVitals(session, actor) {
        if (this.timer.replenish) {
            return;
        }

        this.stopReplenish();
        this.timer.replenish = setInterval(() => {
            const maxHp = actor.fetchMaxHp();
            const maxMp = actor.fetchMaxMp();

            const revHp = DataCache.revitalize.hp[actor.fetchLevel()];
            const revMp = DataCache.revitalize.mp[actor.fetchLevel()];

            const minHp = Math.min(actor.fetchHp() + revHp, maxHp);
            const minMp = Math.min(actor.fetchMp() + revMp, maxMp);

            actor.setHp(minHp);
            actor.setMp(minMp);
            actor.statusUpdateVitals(session, actor);

            if (minHp >= maxHp && minMp >= maxMp) {
                this.stopReplenish();
            }
        }, 3000);
    }

    stopReplenish() {
        clearInterval(this.timer.replenish);
        this.timer.replenish = undefined;
    }

    ticksToMove(srcX, srcY, dstX, dstY, radius, speed) {
        const distance = Formulas.calcDistance(srcX, srcY, dstX, dstY) - radius;
        const duration = 1 + ((this.ticksPerSecond * distance) / speed);
        return (1000 / this.ticksPerSecond) * duration;
    }

    scheduleAction(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        this.setDestId(dst.fetchId());
        session.dataSend(
            ServerResponse.moveToPawn(src, dst, radius)
        );

        // Calculate duration
        src.state.setTowards(radius === 0 ? 'melee' : 'remote');
        const ticks = this.ticksToMove(
            src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY(), radius, src.fetchCollectiveRunSpd()
        );

        // Arrived
        clearTimeout(this.timer.action);
        this.timer.action = setTimeout(() => {
            src.state.setTowards(false);
            this.clearDestId();
            callback();

        }, ticks);
    }

    schedulePickup(session, src, dst, callback) {
        // Execute each time, or else creature is stuck
        session.dataSend(ServerResponse.moveToLocation(src.fetchId(), {
            from: {
                locX: src.fetchLocX(),
                locY: src.fetchLocY(),
                locZ: src.fetchLocZ(),
            },
            to: {
                locX: dst.fetchLocX(),
                locY: dst.fetchLocY(),
                locZ: dst.fetchLocZ(),
            }
        }));

        // Calculate duration
        src.state.setTowards('pickup');
        const ticks = this.ticksToMove(
            src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY(), 0, src.fetchCollectiveRunSpd()
        );

        // Arrived
        clearTimeout(this.timer.pickup);
        this.timer.pickup = setTimeout(() => {
            src.state.setTowards(false);
            callback();

        }, ticks);
    }

    abortAll(creature) {
        creature.state.setTowards(false);
        clearTimeout(this.timer.action);
        clearTimeout(this.timer.pickup);
    }
}

module.exports = Automation;
