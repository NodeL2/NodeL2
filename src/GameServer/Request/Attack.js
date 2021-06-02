let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

function attack(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()
        .readD()
        .readD()
        .readD()
        .readC();

    let data = {
        id: packet.data[1],
         x: packet.data[2],
         y: packet.data[3],
         z: packet.data[4],
    };

    // session.sendData(
    //     GameServerResponse.autoAttackStart(data.id), false
    // );

    // Check player's combat mode
    if (session.player.inCombat) {
        session.sendData(
            GameServerResponse.attackCanceled(session.player), false
        );
        return;
    }

    // Get NPC statistics
    let npc = World.fetchNpcWithId(data.id);

    if (npc !== undefined) {
        session.player.inCombat = true;

        // Select NPC
        session.sendData(
            GameServerResponse.targetSelected(data.id), false
        );

        // Update NPC statistics
        session.sendData(
            GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
        );

        // Attack NPC
        session.sendData(
            GameServerResponse.attack(session.player, data.id), false
        );

        setTimeout(function() { // Needs rework
            let hitDamage = 15 + Math.floor(Math.random() * 10);
            npc.hp = Math.max(0, npc.hp - hitDamage); // HP bar would disappear if less than zero

            session.sendData(
                GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
            );

            session.sendData(
                GameServerResponse.systemMessage(hitDamage), false
            );

            // Death of NPC
            if (npc.hp === 0) {
                session.sendData(
                    GameServerResponse.die(npc.id), false
                );
            }
        }, 950); // Until hit point

        setTimeout(function() {
            session.player.inCombat = false;
        }, 1650); // Until end of combat
    }
}

module.exports = attack;
