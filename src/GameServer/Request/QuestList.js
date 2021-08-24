let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function questList(session, buffer) {
    let packet = new ClientPacket(buffer);

    consume(session, {
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.questList()
    );
}

module.exports = questList;
