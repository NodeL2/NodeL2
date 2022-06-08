const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');

function socialAction(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readD(); // Action ID

    consume(session, {
        actionId: packet.data[0]
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.socialAction(session.actor.model.id, data.actionId)
    );
}

module.exports = socialAction;
