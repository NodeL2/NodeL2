const CreatureState = invoke('Server/Game/Creature/State');

class Creature {
    constructor(data) {
        this.model = data;
        this.state = new CreatureState();

        // Schedule timer
        this.timer = undefined; // TODO: Move this into actual GameServer timer
    }

    // Set

    setId(id) {
        this.model.id = id;
    }

    setLocX(locX) {
        this.model.locX = locX;
    }

    setLocY(locY) {
        this.model.locY = locY;
    }

    setLocZ(locZ) {
        this.model.locZ = locZ;
    }

    setHead(head) {
        this.model.head = head;
    }

    setLocXYZH(coords) {
        this.setLocX(coords.locX);
        this.setLocY(coords.locY);
        this.setLocZ(coords.locZ);
        this.setHead(coords.head);
    }

    // Get

    fetchId() {
        return this.model.id;
    }

    fetchName() {
        return this.model.name;
    }

    fetchTitle() {
        return this.model.title;
    }

    fetchLevel() {
        return this.model.level;
    }

    fetchHp() {
        return this.model.hp;
    }

    fetchMaxHp() {
        return this.model.maxHp;
    }

    fetchMp() {
        return this.model.mp;
    }

    fetchMaxMp() {
        return this.model.maxMp;
    }

    fetchPAtk() {
        return this.model.pAtk;
    }

    fetchPDef() {
        return this.model.pDef;
    }

    fetchMAtk() {
        return this.model.mAtk;
    }

    fetchMDef() {
        return this.model.mDef;
    }

    fetchAtkSpd() {
        return this.model.atkSpd;
    }

    fetchCastSpd() {
        return this.model.castSpd;
    }

    fetchWalk() {
        return this.model.walk;
    }

    fetchRun() {
        return this.model.run;
    }

    fetchSwim() {
        return this.model.swim;
    }

    fetchRadius() {
        return this.model.radius;
    }

    fetchSize() {
        return this.model.size;
    }

    fetchLocX() {
        return this.model.locX;
    }

    fetchLocY() {
        return this.model.locY;
    }

    fetchLocZ() {
        return this.model.locZ;
    }

    fetchHead() {
        return this.model.head;
    }

    // Abstract

    scheduleArrival(src, dest, offset, callback) {
        const ticksPerSecond = 10;

        const dX = dest.fetchLocX() - src.fetchLocX();
        const dY = dest.fetchLocY() - src.fetchLocY();
        const distance = Math.sqrt((dX * dX) + (dY * dY)) + offset;
        
        if (distance <= offset) {
            this.abortScheduleTimer();
            callback();
            return;
        }

        //const sin = dY / distance;
        //const cos = dX / distance;

        const ticksToMove = 1 + ((ticksPerSecond * distance) / src.fetchRun());
        this.abortScheduleTimer();

        this.timer = setTimeout(() => {
            this.updatePosition({
                locX: dest.fetchLocX(),
                locY: dest.fetchLocY(),
                locZ: dest.fetchLocZ(),
                head: src .fetchHead(),
            });

            callback();

        }, (1000 / ticksPerSecond) * ticksToMove);
    }

    abortScheduleTimer() {
        clearTimeout(this.timer);
        this.timer = undefined;
    }
}

module.exports = Creature;
