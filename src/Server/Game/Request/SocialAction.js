const ClientPacket = invoke('Packet/Client');

function socialAction(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD(); // Action ID

    consume(session, {
        actionId: packet.data[0]
    });
}

function consume(session, data) {
    session.actor.socialAction(session, data.actionId);
}

module.exports = socialAction;
