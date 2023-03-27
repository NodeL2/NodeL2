const ServerResponse = invoke('GameServer/Network/Response');
const Database       = invoke('Database');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.itemsList(session.actor.backpack.fetchItems()));
    Database.fetchShortcuts(session.actor.fetchId()).then((shortcuts) => {
        session.dataSend(
            ServerResponse.shortcutInit(shortcuts)
        );
    });
    invoke('GameServer/Generics').enterWorld(session, session.actor);

    session.dataSend(ServerResponse.sunrise()); // TODO: Server timer
    session.dataSend(ServerResponse.userInfo(session.actor));
}

module.exports = enterWorld;
