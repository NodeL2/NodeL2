const ReceivePacket = invoke('Server/Packet/Receive');

function socialAction(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Action Id

    consume(session, {
        actionId: packet.data[0]
    });
}

function consume(session, data) {
    session.actor.socialAction(session, data.actionId);
}

module.exports = socialAction;
