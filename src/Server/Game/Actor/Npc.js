const Creature = invoke('Server/Game/Actor/Creature');

class Monster extends Creature {
    fetchKind() {
        this.model.kind;
    }

    fetchHostile() {
        this.model.hostile;
    }
}

module.exports = Monster;
