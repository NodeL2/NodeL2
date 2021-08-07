let ClientPacket = invoke('ClientPacket');

function socialAction(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // Action ID

    consume(session, {
        actionId: packet.data[0]
    });
}

function consume(session, data) {
    session.player.socialAction(session, data);
}

module.exports = socialAction;
