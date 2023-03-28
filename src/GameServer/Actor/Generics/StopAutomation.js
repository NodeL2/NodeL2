const ServerResponse = invoke('GameServer/Network/Response');

function stopAutomation(session, actor) {
    actor.automation.abortAll(actor);

    session.dataSend(
        ServerResponse.stopMove(actor.fetchId(), {
            locX: actor.fetchLocX(),
            locY: actor.fetchLocY(),
            locZ: actor.fetchLocZ(),
            head: actor.fetchHead(),
        })
    );
}

module.exports = stopAutomation;
