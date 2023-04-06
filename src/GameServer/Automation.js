const ServerResponse = invoke('GameServer/Network/Response');
const SelectedModel  = invoke('GameServer/Model/Selected');
const Timer          = invoke('GameServer/Timer');
const SpeckMath      = invoke('GameServer/SpeckMath');

class Automation extends SelectedModel {
    constructor() {
        // Parent inheritance
        super();

        this.timer = { // TODO: Move this into actual GameServer timer
            replenish : undefined,
            action    : Timer.init(),
            pickup    : Timer.init(),
        };

        this.ticksPerSecond = 10;
    }

    destructor(creature) {
        this.stopReplenish();
        this.abortAll(creature);
    }

    // Set

    setRevHp(data) {
        this.revHp = data;
    }

    setRevMp(data) {
        this.revMp = data;
    }

    // Get

    fetchRevHp() {
        return this.revHp;
    }

    fetchRevMp() {
        return this.revMp;
    }

    // Abstract

    replenishVitals(creature) {
        if (this.timer.replenish) {
            return;
        }

        this.stopReplenish();
        this.timer.replenish = setInterval(() => {
            const maxHp = creature.fetchMaxHp();
            const maxMp = creature.fetchMaxMp();

            const minHp = Math.min(creature.fetchHp() + this.fetchRevHp(), maxHp);
            const minMp = Math.min(creature.fetchMp() + this.fetchRevMp(), maxMp);

            creature.setHp(minHp);
            creature.setMp(minMp);

            if (creature.fetchKind === undefined) {
                creature.statusUpdateVitals(creature);
            }
            else {
                creature.broadcastVitals();
            }

            if (minHp >= maxHp && minMp >= maxMp) {
                this.stopReplenish();
            }
        }, 3000);
    }

    stopReplenish() {
        clearInterval(this.timer.replenish);
        this.timer.replenish = undefined;
    }

    ticksToMove(srcX, srcY, srcZ, dstX, dstY, dstZ, radius, speed) {
        const distance = new SpeckMath.Point3D(srcX, srcY, srcZ).distance(new SpeckMath.Point3D(dstX, dstY, dstZ)) - radius;
        const duration = 1 + ((this.ticksPerSecond * distance) / speed);
        return (1000 / this.ticksPerSecond) * duration;
    }

    scheduleAction(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        this.setDestId(dst.fetchId());
        session.dataSendToMeAndOthers(ServerResponse.moveToPawn(src, dst, radius), src);

        // Calculate duration
        src.state.setTowards(radius === 0 ? 'melee' : 'remote');
        const ticks = this.ticksToMove(
            src.fetchLocX(), src.fetchLocY(), src.fetchLocZ(), dst.fetchLocX(), dst.fetchLocY(), dst.fetchLocZ(), radius, src.fetchCollectiveRunSpd()
        );

        // Arrived
        Timer.start(this.timer.action, () => {
            src.state.setTowards(false);
            this.clearDestId();
            callback();

        }, ticks);
    }

    fetchDistanceRatio() {
        if (Timer.exists(this.timer.action)) {
            return Timer.completeness(this.timer.action);
        }
        return false;
    }

    schedulePickup(session, src, dst, callback) {
        const from = {
            locX: src.fetchLocX(),
            locY: src.fetchLocY(),
            locZ: src.fetchLocZ(),
        };

        const to = {
            locX: dst.fetchLocX(),
            locY: dst.fetchLocY(),
            locZ: dst.fetchLocZ(),
        };

        // Execute each time, or else creature is stuck
        session.dataSendToMeAndOthers(ServerResponse.moveToLocation(src.fetchId(), { from: from, to: to }), src);

        // Calculate duration
        src.state.setTowards('pickup');
        const ticks = this.ticksToMove(
            from.locX, from.locY, from.locZ, to.locX, to.locY, to.locZ, 0, src.fetchCollectiveRunSpd()
        );

        // Arrived
        Timer.start(this.timer.pickup, () => {
            src.state.setTowards(false);
            callback();

        }, ticks);
    }

    abortAll(creature) {
        this.clearDestId();
        creature.state.setTowards(false);
        Timer.clear(this.timer.action);
        Timer.clear(this.timer.pickup);
    }
}

module.exports = Automation;
