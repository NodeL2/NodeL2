const ServerResponse   = invoke('Server/Game/Response');
const ServerResponseEx = invoke('Server/Game/Response/Ex');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.sunrise());
    session.dataSend(ServerResponse.userInfo(session.actor));
    
    // Extended
    session.dataSend(
        ServerResponseEx.basicActionList()
    );
}

module.exports = enterWorld;
