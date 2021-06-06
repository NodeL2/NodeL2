let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function showBoard(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD(); // ?

    let data = {
    };

    session.sendData(
        GameServerResponse.showMap(1665)
    );
}

module.exports = showBoard;
