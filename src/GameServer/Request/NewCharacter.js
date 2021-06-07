let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function newCharacter(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC();

    let data = {
    };

    session.sendData(GameServerResponse.charTemplates());
}

module.exports = newCharacter;
