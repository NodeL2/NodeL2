const Creature = invoke('Server/Game/Creature/Creature');

class Npc extends Creature {

    // Get

    fetchKind() {
        this.model.kind;
    }

    fetchHostile() {
        this.model.hostile;
    }
}

module.exports = Npc;
