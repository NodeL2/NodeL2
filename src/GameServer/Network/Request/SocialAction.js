const ReceivePacket = invoke('Packet/Receive');

function socialAction(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Action Id

    consume(session, {
        actionId: packet.data[0]
    });
}

function consume(session, data) {
    invoke('GameServer/Generics').socialAction(session, session.actor, data.actionId);
}

module.exports = socialAction;
