const ServerResponse = invoke('GameServer/Network/Response');
const DataCache      = invoke('GameServer/DataCache');
const Formulas       = invoke('GameServer/Formulas');

class Automation {
    constructor() {
        this.clearDestId();
        this.ticksPerSecond = 10;

        this.timer = { // TODO: Move this into actual GameServer timer
            replenish : undefined,
            melee     : undefined,
            remote    : undefined,
            pickup    : undefined,
        };
    }

    destructor() {
        clearInterval(this.timer.replenish);
        clearTimeout (this.timer.melee);
        clearTimeout (this.timer.remote);
        clearTimeout (this.timer.pickup);
    }

    setDestId(data) {
        this.destId = data;
    }

    fetchDestId() {
        return this.destId;
    }

    clearDestId() {
        this.destId = undefined;
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

    scheduleAtkMelee(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        this.setDestId(dst.fetchId());
        session.dataSend(
            ServerResponse.moveToPawn(src, dst, radius)
        );

        // Calculate duration
        src.state.setAtkMelee(true);
        const ticks = this.ticksToMove(
            src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY(), radius, src.fetchCollectiveRunSpd()
        );

        // Arrived
        clearTimeout(this.timer.melee);
        this.timer.melee = setTimeout(() => {
            src.state.setAtkMelee(false);
            this.clearDestId();
            callback();

        }, ticks);
    }

    scheduleAtkRemote(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        this.setDestId(dst.fetchId());
        session.dataSend(
            ServerResponse.moveToPawn(src, dst, radius)
        );

        // Calculate duration
        src.state.setAtkRemote(true);
        const ticks = this.ticksToMove(
            src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY(), radius, src.fetchCollectiveRunSpd()
        );

        // Arrived
        clearTimeout(this.timer.remote);
        this.timer.remote = setTimeout(() => {
            src.state.setAtkRemote(false);
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
        src.state.setPickinUp(true);
        const ticks = this.ticksToMove(
            src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY(), 0, src.fetchCollectiveRunSpd()
        );

        // Arrived
        clearTimeout(this.timer.pickup);
        this.timer.pickup = setTimeout(() => {
            src.state.setPickinUp(false);
            callback();

        }, ticks);
    }

    abortScheduledAtkMelee(creature) {
        creature.state.setAtkMelee(false);
        clearTimeout(this.timer.melee);
    }

    abortScheduledAtkRemote(creature) {
        creature.state.setAtkRemote(false);
        clearTimeout(this.timer.remote);
    }

    abortScheduledPickup(creature) {
        creature.state.setPickinUp(false);
        clearTimeout(this.timer.pickup);
    }

    abortAll(creature) {
        this.abortScheduledAtkMelee (creature);
        this.abortScheduledAtkRemote(creature);
        this.abortScheduledPickup   (creature);
    }
}

module.exports = Automation;
