const DataCache   = invoke('GameServer/DataCache');
const ConsoleText = invoke('GameServer/ConsoleText');

function enterWorld(session, actor) {
    const Generics = invoke('GameServer/Generics');

    // Calculate accumulated
    Generics.calculateStats(session, actor);
    actor.skillset.populate(actor.fetchId());

    // Start vitals replenish
    actor.automation.setRevHp(DataCache.revitalize.hp[actor.fetchLevel()]);
    actor.automation.setRevMp(DataCache.revitalize.mp[actor.fetchLevel()]);
    actor.automation.replenishVitals(actor);

    // Show npcs based on radius
    Generics.updatePosition(session, actor, {
        locX: actor.fetchLocX(),
        locY: actor.fetchLocY(),
        locZ: actor.fetchLocZ(),
        head: actor.fetchHead(),
    });

    // Default
    ConsoleText.transmit(session, ConsoleText.caption.welcome);
}

module.exports = enterWorld;
