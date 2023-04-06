const ServerResponse = invoke('GameServer/Network/Response');

function stopAutomation(session, creature) {
    creature.automation.abortAll(creature);

    session.dataSend(
        ServerResponse.stopMove(creature.fetchId(), {
            locX: creature.fetchLocX(),
            locY: creature.fetchLocY(),
            locZ: creature.fetchLocZ(),
            head: creature.fetchHead(),
        }), true
    );
}

module.exports = stopAutomation;
