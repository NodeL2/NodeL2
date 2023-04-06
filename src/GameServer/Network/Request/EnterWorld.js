const ServerResponse = invoke('GameServer/Network/Response');
const Database       = invoke('Database');

function enterWorld(session, buffer) {
    session.dataSendToMe(ServerResponse.itemsList(session.actor.backpack.fetchItems()));
    Database.fetchShortcuts(session.actor.fetchId()).then((shortcuts) => {
        session.dataSendToMe(
            ServerResponse.shortcutInit(shortcuts)
        );
    });
    
    session.actor.enterWorld();
    session.dataSendToMe(ServerResponse.sunrise()); // TODO: Server timer
    session.dataSendToMe(ServerResponse.userInfo(session.actor));
    session.dataSendToOthers(ServerResponse.charInfo(session.actor), session.actor);
}

module.exports = enterWorld;
