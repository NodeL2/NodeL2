const ServerResponse = invoke('Server/Game/Network/Response');
const DataCache      = invoke('Server/Game/DataCache');
const Database       = invoke('Server/Database');

function skillsList(session, buffer) {
    Database.fetchSkills(session.actor.fetchId()).then((skills) => {
        session.dataSend(
            ServerResponse.skillsList(skills)
        );
    });
}

module.exports = skillsList;
