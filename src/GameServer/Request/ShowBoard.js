let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function showBoard(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readD(); // ?

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.showMap(1665)
    );
}

module.exports = showBoard;
