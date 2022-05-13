const ServerResponse = invoke('Server/Game/Response');
const ClientPacket   = invoke('Packet/Client');
const Database       = invoke('Database');

function charNameCreatable(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readS();

    consume(session, {
        characterName: packet.data[0]
    });
}

function consume(session, data) { // TODO: Check if name exists in Database
    console.info(data.characterName);
}

module.exports = charNameCreatable;
