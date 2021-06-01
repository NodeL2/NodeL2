let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function actionUse(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()  // Action ID
        .readD()
        .readC();

    let data = {
        actionId: packet.data[1]
    };

    switch (data.actionId) {
        case 0: // Stand/Sit
            session.player.isStanding = !session.player.isStanding;

            session.sendData(
                GameServerResponse.changeWaitType(session.player), false
            );
            break;

        case 1: // Run/Walk
            session.player.isRunning = !session.player.isRunning;

            session.sendData(
                GameServerResponse.changeMoveType(session.player), false
            );
            break;
    }
}

module.exports = actionUse;
