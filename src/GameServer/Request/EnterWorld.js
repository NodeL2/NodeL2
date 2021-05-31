let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function enterWorld(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC();

    let data = {
    };

    session.sendData(
        GameServerResponse.sunrise(), false
    );

    session.sendData(
        GameServerResponse.userInfo(session.player), false
    );
}

module.exports = enterWorld;
