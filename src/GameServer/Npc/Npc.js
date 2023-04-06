const ServerResponse = invoke('GameServer/Network/Response');
const NpcModel       = invoke('GameServer/Model/Npc');
const Automation     = invoke('GameServer/Automation');
const ConsoleText    = invoke('GameServer/ConsoleText');
const SpeckMath      = invoke('GameServer/SpeckMath');
const Formulas       = invoke('GameServer/Formulas');

class Npc extends NpcModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.automation = new Automation();
        this.automation.setRevHp(this.fetchRevHp());
        this.automation.setRevMp(this.fetchRevMp());

        this.setId(id);
        this.fillupVitals();

        // User preferences
        const optn = options.default.General;

        if (optn.showMonsterLevel) {
            this.showLevelTitle();
        }

        // TODO: Move this into actual GameServer timer
        this.timer = {
            combat: undefined
        };
    }

    destructor(session) {
        this.automation.stopReplenish();
        this.abortCombatState(session);
    }

    showLevelTitle() {
        if (this.fetchAttackable() && this.fetchTitle() === '') {
            this.setTitle('Lv ' + this.fetchLevel() + (this.fetchHostile() ? ' @' : ''));
        }
    }

    enterCombatState(session, actor) {
        if (this.state.fetchCombats()) {
            return;
        }

        this.state.setCombats(true);

        this.setStateRun(true);
        this.setStateAttack(true);
        session.dataSend(ServerResponse.walkAndRun(this.fetchId(), this.fetchStateRun()));
        session.dataSend(ServerResponse.autoAttackStart(this.fetchId()), this);

        setTimeout(() => {
            const coords = {
                locX: 0,
                locY: 0,
                locZ: 0,
            };

            this.timer.combat = setInterval(() => {
                if (new SpeckMath.Point(this.fetchLocX(), this.fetchLocY()).distance(new SpeckMath.Point(actor.fetchLocX(), actor.fetchLocY())) >= 1500) {
                    this.abortCombatState(session); // Actor is out of reach
                    return;
                }

                if (this.state.isBlocked()) {
                    return;
                }

                const newDstX = actor.fetchLocX();
                const newDstY = actor.fetchLocY();
                const newDstZ = actor.fetchLocZ();

                if (this.state.inMotion()) {
                    if (coords.locX !== newDstX || coords.locY !== newDstY) {
                        this.setLocXYZ(new SpeckMath.Point3D(this.fetchLocX(), this.fetchLocY(), this.fetchLocZ()).midPoint(new SpeckMath.Point3D(coords.locX, coords.locY, coords.locZ), this.automation.fetchDistanceRatio() * 1.3).toCoords()); // TODO: Another hack to catch-up

                        this.automation.abortAll(this);
                    }
                    return;
                }

                coords.locX = newDstX;
                coords.locY = newDstY;
                coords.locZ = newDstZ;

                this.automation.scheduleAction(session, this, actor, actor.fetchRadius(), () => {
                    this.setLocXYZ(coords);

                    if (new SpeckMath.Point(coords.locX, coords.locY).distance(new SpeckMath.Point(actor.fetchLocX(), actor.fetchLocY())) <= this.fetchAtkRadius()) {
                        session.dataSend(
                            ServerResponse.stopMove(this.fetchId(), {
                                locX: this.fetchLocX(),
                                locY: this.fetchLocY(),
                                locZ: this.fetchLocZ(),
                                head: this.fetchHead(),
                            }), this
                        );

                        this.meleeHit(session, this, actor);
                    }
                });

            }, 100);

        }, 1000);
    }

    abortCombatState(session) {
        clearInterval(this.timer.combat);
        this.timer.combat = undefined;

        this.clearDestId();
        this.state.setCombatEnded();
        this.automation.abortAll(this);

        this.setStateRun(false);
        this.setStateAttack(false);
        session.dataSend(ServerResponse.walkAndRun(this.fetchId(), this.fetchStateRun()));
        session.dataSend(ServerResponse.autoAttackStop(this.fetchId()), this);
    }

    meleeHit(session, src, dst) {
        if (this.checkParticipants(session, src, dst)) {
            return;
        }

        const speed = Formulas.calcMeleeAtkTime(src.fetchCollectiveAtkSpd());
        const hitLanded = Formulas.calcHitChance();
        session.dataSend(ServerResponse.attack(src, dst.fetchId(), hitLanded ? 0x00 : 0x80), this);
        src.state.setHits(true);

        setTimeout(() => {
            if (this.checkParticipants(session, src, dst)) {
                return;
            }

            if (hitLanded) {
                const pAtk = src.fetchCollectivePAtk();
                this.hit(session, dst, Formulas.calcMeleeHit(pAtk, 0, dst.fetchCollectivePDef()));
            }

        }, speed * 0.644);

        setTimeout(() => {
            this.state.setHits(false);

        }, speed); // Until end of combat move
    }

    checkParticipants(session, src, dst) {
        if (src.state.fetchDead() || dst.state.fetchDead()) {
            this.abortCombatState(session);
            return true;
        }
        return false;
    }

    hit(session, actor, hit) {
        ConsoleText.transmit(session, ConsoleText.caption.monsterHit, [
            { kind: ConsoleText.kind.npc, value: this.fetchDispSelfId() }, { kind: ConsoleText.kind.number, value: hit }
        ]);
        invoke(path.actor).receivedHit(session, actor, hit);
    }

    broadcastVitals() {
        invoke(path.npc).broadcastVitals(this);
    }
}

module.exports = Npc;
