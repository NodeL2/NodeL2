const ServerResponseEx = invoke('Server/Game/Response/Ex');
const ClientPacket     = invoke('Packet/Client');
const Database         = invoke('Database');
const Utils            = invoke('Utils');

function charNameCreatable(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readS();

    consume(session, {
        characterName: Utils.stripNull(packet.data[0])
    });
}

function consume(session, data) {
    let result = -1;

    Database.fetchCharacters(session.accountId).then((userChars) => {
        Database.fetchCharacterWithName(data.characterName).then((serverChars) => {
            if (serverChars[0]) {
                result = 2;
            }
            else if (!Utils.isAlphaNumeric(data.characterName)) {
                result = 4;
            }
            else if (userChars.length >= 7) {
                result = 8;
            }

            // It looks like the amount of letters is capped in the client, so no check for that
            session.dataSend(
                ServerResponseEx.charNameCreatable(result)
            );
        });
    });
}

module.exports = charNameCreatable;
