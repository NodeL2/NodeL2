function basicAction(session, actor, data) {
    const Generics = invoke('GameServer/Generics');

    if (actor.isDead()) {
        return;
    }

    switch (data.actionId) {
    case 0x00: // Sit / Stand
        Generics.sitAndStand(session, actor, data);
        break;

    case 0x01: // Walk / Run
        Generics.walkAndRun(session, actor);
        break;

    case 0x28: // Recommend without selection
        break;

    default:
        utils.infoWarn('GameServer :: unknown basic action 0x%s', utils.toHex(data.actionId));
        break;
    }
}

module.exports = basicAction;
