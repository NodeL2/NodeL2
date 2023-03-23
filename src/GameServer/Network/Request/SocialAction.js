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
    session.actor.socialAction(data.actionId);
}

module.exports = socialAction;
