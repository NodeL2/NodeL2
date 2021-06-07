let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function questList(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC();

    let data = {
    };

    session.sendData(GameServerResponse.questList());
}

module.exports = questList;
