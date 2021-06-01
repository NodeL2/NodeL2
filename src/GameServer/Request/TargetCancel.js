let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function targetCancel(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC();

    let data = {
    };

    session.sendData(
        GameServerResponse.targetUnselected(session.player), false
    )
}

module.exports = targetCancel;
