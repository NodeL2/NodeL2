const ServerResponse = invoke('Server/Game/Network/Response');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.sunrise());
    session.dataSend(ServerResponse.userInfo(session.actor));

//    session.dataSend(
//        ServerResponseEx.basicActionList()
//    );
//
//    // Mock data
//    World.insertNpcs(session);
}

module.exports = enterWorld;
