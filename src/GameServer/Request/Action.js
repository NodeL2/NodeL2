let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');
let World = invoke('GameServer/World');

function action(session, buffer) {
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

    // Select NPC
    session.sendData(
        GameServerResponse.targetSelected(data.id), false
    );

    // Get NPC statistics
    let npc = World.fetchNpcWithId(data.id);

    if (npc !== undefined) {
        session.sendData(
            GameServerResponse.statusUpdate(data.id, npc.hp, npc.maxHp), false
        );
    }
}

module.exports = action;
