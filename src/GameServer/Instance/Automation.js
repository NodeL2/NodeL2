const ServerResponse = invoke('GameServer/Network/Response');
const Formulas       = invoke('GameServer/Formulas');

class Automation {
    constructor() {
        this.ticksPerSecond = 10;

        this.timer = { // TODO: Move this into actual GameServer timer
            replenishMp: undefined, arrival: undefined
        }
    }

    destructor() {
        clearInterval(this.timer.replenishMp);
        clearTimeout (this.timer.arrival);
    }

    replenishMp(session, actor) {
        clearInterval(this.timer.replenishMp);
        this.timer.replenishMp = setInterval(() => {
            const value = actor.fetchMp() + 3; // TODO: Not real formula
            const max   = actor.fetchMaxMp();

            actor.setMp(Math.min(value, max));
            actor.statusUpdateVitals(session, actor);
        }, 3000);
    }

    scheduleArrival(session, creatureSrc, creatureDest, offset, callback) {
        const distance = Formulas.calcDistance(
            creatureSrc .fetchLocX(), creatureSrc .fetchLocY(),
            creatureDest.fetchLocX(), creatureDest.fetchLocY(),
        ) - offset;

        // Execute each time, or else creature is stuck
        session.dataSend(
            ServerResponse.moveToPawn(creatureSrc, creatureDest, offset)
        );

        // Melee radius, no need to move
        if (distance <= creatureDest.fetchRadius() + 30) {
            this.abortScheduleTimer(creatureSrc);
            callback();
            return;
        }

        if (creatureSrc.state.fetchOnTheMove()) {
            return;
        }

        // Calculate duration and reset
        const ticksToMove = 1 + ((this.ticksPerSecond * distance) / creatureSrc.fetchRun());
        this.abortScheduleTimer(creatureSrc);

        // Creature is occupied
        creatureSrc.state.setOnTheMove(true);

        // Arrived
        this.timer.arrival = setTimeout(() => {
            creatureSrc.state.setOnTheMove(false);
            callback();

        }, (1000 / this.ticksPerSecond) * ticksToMove);
    }

    abortScheduleTimer(creature) {
        creature.state.setOnTheMove(false);
        clearTimeout(this.timer.arrival);
    }
}

module.exports = Automation;
