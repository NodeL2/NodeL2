const ServerResponse = invoke('Server/Game/Network/Response');

function skillsList(session, buffer) {
    session.dataSend(
        ServerResponse.skillsList()
    );
}

module.exports = skillsList;
