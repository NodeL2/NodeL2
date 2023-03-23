const ServerResponse = invoke('GameServer/Network/Response');

function showMap(session, buffer) {
    session.dataSend(
        ServerResponse.showMap(1665)
    );
}

module.exports = showMap;
