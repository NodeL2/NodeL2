const ServerResponse = invoke('GameServer/Network/Response');
const Database       = invoke('Database');

function skillsList(session, buffer) {
    Database.fetchSkills(session.actor.fetchId()).then((skills) => {
        session.dataSend(
            ServerResponse.skillsList(skills)
        );
    });
}

module.exports = skillsList;
