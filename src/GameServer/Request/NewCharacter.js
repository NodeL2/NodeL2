let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function newCharacter(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC(); // Status

    let data = {
        status: packet.data[0]
    };

    if (data.status === 0x0e) {
        session.sendData(
            GameServerResponse.charTemplates()
        );
    }
}

module.exports = newCharacter;
