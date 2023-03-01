const ServerResponse = invoke('GameServer/Network/Response');
const Formulas       = invoke('GameServer/Formulas');

class Automation {
    constructor() {
        this.ticksPerSecond = 10;

        this.timer = { // TODO: Move this into actual GameServer timer
            replenishMp: undefined, attack: undefined, pickup: undefined
        }
    }

    destructor() {
        clearInterval(this.timer.replenishMp);
        clearTimeout (this.timer.attack);
        clearTimeout (this.timer.pickup);
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

    scheduleAttack(session, creatureSrc, creatureDest, offset, callback) {
        this.abortScheduledPickup(creatureSrc);

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
            this.abortScheduledAttack(creatureSrc);
            callback();
            return;
        }

        if (creatureSrc.state.fetchOnTheMove()) {
            return;
        }

        // Calculate duration and reset
        const ticksToMove = 1 + ((this.ticksPerSecond * distance) / creatureSrc.fetchRun());
        this.abortScheduledAttack(creatureSrc);

        // Creature is occupied
        creatureSrc.state.setOnTheMove(true);

        // Arrived
        this.timer.attack = setTimeout(() => {
            creatureSrc.state.setOnTheMove(false);
            callback();

        }, (1000 / this.ticksPerSecond) * ticksToMove);
    }

    abortScheduledAttack(creature) {
        creature.state.setOnTheMove(false);
        clearTimeout(this.timer.attack);
    }

    schedulePickup(session, creatureSrc, creatureDest, callback) {
        this.abortScheduledAttack(creatureSrc);

        let distance = Formulas.calcDistance(
            creatureSrc .fetchLocX(), creatureSrc .fetchLocY(),
            creatureDest.fetchLocX(), creatureDest.fetchLocY(),
        );

        if (creatureSrc.state.fetchPickinUp()) {
            return;
        }

        // Execute each time, or else creature is stuck
        session.dataSend(ServerResponse.moveToLocation(creatureSrc.fetchId(), {
            from: {
                locX: creatureSrc.fetchLocX(),
                locY: creatureSrc.fetchLocY(),
                locZ: creatureSrc.fetchLocZ(),
            },
            to: {
                locX: creatureDest.fetchLocX(),
                locY: creatureDest.fetchLocY(),
                locZ: creatureDest.fetchLocZ(),
            }
        }));

        // Calculate duration and reset
        const ticksToMove = 1 + ((this.ticksPerSecond * distance) / creatureSrc.fetchRun());
        this.abortScheduledPickup(creatureSrc);

        // Creature is occupied
        creatureSrc.state.setPickinUp(true);

        // Arrived
        this.timer.pickup = setTimeout(() => {
            creatureSrc.state.setPickinUp(false);
            callback();

        }, (1000 / this.ticksPerSecond) * ticksToMove);
    }

    abortScheduledPickup(creature) {
        creature.state.setPickinUp(false);
        clearTimeout(this.timer.pickup);
    }
}

module.exports = Automation;
