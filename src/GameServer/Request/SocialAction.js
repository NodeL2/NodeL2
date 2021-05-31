let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function socialAction(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD();

    let data = {
        actionId: packet.data[1]
    };

    session.sendData(
        GameServerResponse.socialAction(session.player, data.actionId), false
    );
}

module.exports = socialAction;
