const ServerResponse = invoke('Server/Game/Response');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.sunrise());
    session.dataSend(ServerResponse.userInfo(session.actor));

//    // Extended
//    session.dataSend(
//        ServerResponseEx.basicActionList()
//    );
//
//    // Mock data
//    World.insertNpcs(session);
}

module.exports = enterWorld;
