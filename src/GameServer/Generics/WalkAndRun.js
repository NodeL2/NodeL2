const ServerResponse = invoke('GameServer/Network/Response');

function walkAndRun(session, actor) {
    actor.state.setWalkin(!actor.state.fetchWalkin());
    session.dataSend(
        ServerResponse.walkAndRun(actor.fetchId(), actor.state.fetchWalkin() ? 0 : 1)
    );
}

module.exports = walkAndRun;
