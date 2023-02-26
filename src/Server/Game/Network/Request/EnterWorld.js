const ServerResponse = invoke('Server/Game/Network/Response');
const World          = invoke('Server/Game/World');
const Database       = invoke('Server/Database');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.consoleText(34));
    session.dataSend(ServerResponse.sunrise()); // TODO: Server timer
    session.dataSend(ServerResponse.userInfo (session.actor));
    session.dataSend(ServerResponse.itemsList(session.actor.backpack.fetchItems()));

    Database.fetchShortcuts(session.actor.fetchId()).then((shortcuts) => {
        session.dataSend(
            ServerResponse.shortcutInit(shortcuts)
        );
    });

    session.actor.automation.replenishMp(session);

    // Show npcs based on radius
    session.actor.updatePosition(session, {
        locX: session.actor.fetchLocX(),
        locY: session.actor.fetchLocY(),
        locZ: session.actor.fetchLocZ(),
        head: session.actor.fetchHead(),
    });
}

module.exports = enterWorld;
