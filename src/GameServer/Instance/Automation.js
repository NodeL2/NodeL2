const ServerResponse = invoke('GameServer/Network/Response');
const Formulas       = invoke('GameServer/Formulas');

class Automation {
    constructor() {
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

    replenishVitals(session, actor) {
        if (this.timer.replenish) {
            return;
        }

        this.stopReplenish();
        this.timer.replenish = setInterval(() => {
            const maxHp = actor.fetchMaxHp();
            const maxMp = actor.fetchMaxMp();

            const minHp = Math.min(actor.fetchHp() + (maxHp / 100), maxHp);
            const minMp = Math.min(actor.fetchMp() + (maxMp / 100), maxMp);

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

    scheduleAtkMelee(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        session.dataSend(
            ServerResponse.moveToPawn(src, dst, radius)
        );

        if (src.state.fetchAtkMelee()) {
            return;
        }

        // Calculate duration
        src.state.setAtkMelee(true);
        const distance = Formulas.calcDistance(src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY()) - radius;
        const ticksToMove = 1 + ((this.ticksPerSecond * distance) / src.fetchRun());

        // Arrived
        clearTimeout(this.timer.melee);
        this.timer.melee = setTimeout(() => {
            src.state.setAtkMelee(false);
            callback();

        }, (1000 / this.ticksPerSecond) * ticksToMove);
    }

    scheduleAtkRemote(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        session.dataSend(
            ServerResponse.moveToPawn(src, dst, radius - 50)
        );

        if (src.state.fetchAtkRemote()) {
            return;
        }

        // Calculate duration
        src.state.setAtkRemote(true);
        const distance = Formulas.calcDistance(src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY()) - radius;
        const ticksToMove = 1 + ((this.ticksPerSecond * distance) / src.fetchRun());

        // Arrived
        clearTimeout(this.timer.remote);
        this.timer.remote = setTimeout(() => {
            src.state.setAtkRemote(false);
            callback();

        }, (1000 / this.ticksPerSecond) * ticksToMove);
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

        if (src.state.fetchPickinUp()) {
            return;
        }

        // Calculate duration
        src.state.setPickinUp(true);
        const distance = Formulas.calcDistance(src.fetchLocX(), src.fetchLocY(), dst.fetchLocX(), dst.fetchLocY());
        const ticksToMove = 1 + ((this.ticksPerSecond * distance) / src.fetchRun());

        // Arrived
        clearTimeout(this.timer.pickup);
        this.timer.pickup = setTimeout(() => {
            src.state.setPickinUp(false);
            callback();

        }, (1000 / this.ticksPerSecond) * ticksToMove);
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
