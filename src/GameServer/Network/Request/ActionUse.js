const ReceivePacket = invoke('Packet/Receive');

function actionUse(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Action Id
        .readD()  // Ctrl
        .readC(); // Shift

    consume(session, {
        actionId: packet.data[0],
            ctrl: packet.data[1],
           shift: packet.data[2],
    });
}

function consume(session, data) {
    invoke('GameServer/Generics').basicAction(session, session.actor, data);
}

module.exports = actionUse;
