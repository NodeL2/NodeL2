let ClientPacket   = invoke('ClientPacket');
let ServerResponse = invoke('GameServer/Response');

function say(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readS()  // Text
        .readD(); // Type

    consume(session, {
        text: packet.data[0],
        type: packet.data[1],
    });
}

function consume(session, data) {
    session.sendData(
        ServerResponse.say(session.player, data.text, data.type)
    );
}

module.exports = say;
