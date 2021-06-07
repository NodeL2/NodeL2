let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function say(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readS()  // Text
        .readD(); // Type

    let data = {
        text: packet.data[1],
        type: packet.data[2],
    };

    session.sendData(GameServerResponse.createSay(session.player, data.text, data.type));
}

module.exports = say;
