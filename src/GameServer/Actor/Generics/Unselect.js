const ServerResponse = invoke('GameServer/Network/Response');

function unselect(session, actor) {
    actor.clearDestId();
    session.dataSendToMe(ServerResponse.destDeselected(actor));
}

module.exports = unselect;
