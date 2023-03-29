function stopAutomation(session, actor) {
    actor.automation.abortAll(actor);

    invoke(path.actor).updatePosition(session, actor, {
        locX: actor.fetchLocX(),
        locY: actor.fetchLocY(),
        locZ: actor.fetchLocZ(),
        head: actor.fetchHead(),
    });
}

module.exports = stopAutomation;
