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

    // Attack NPC
    session.sendData(
        GameServerResponse.attack(session.player, data.id), false
    );

    // Get NPC statistics
    let npc = World.fetchNpcWithId(data.id);

    if (npc !== undefined) {
        npc.hp--; // Too early, appears before hit animation

        session.sendData(
            GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
        );
    }
}

module.exports = attack;
