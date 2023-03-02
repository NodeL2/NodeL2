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
        }
    }

    destructor() {
        clearInterval(this.timer.replenish);
        clearTimeout (this.timer.melee);
        clearTimeout (this.timer.remote);
        clearTimeout (this.timer.pickup);
    }

    replenishMp(session, actor) {
        clearInterval(this.timer.replenish);
        this.timer.replenish = setInterval(() => {
            const value = actor.fetchMp() + 3; // TODO: Not real formula
            const max   = actor.fetchMaxMp();

            actor.setMp(Math.min(value, max));
            actor.statusUpdateVitals(session, actor);
        }, 3000);
    }

    scheduleAtkMelee(session, src, dst, radius, callback) {
        // Execute each time, or else creature is stuck
        session.dataSend(
            ServerResponse.moveToPawn(src, dst, radius - 50)
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
            ServerResponse.moveToPawn(src, dst, radius)
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
