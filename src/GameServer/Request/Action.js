let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function action(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()
        .readD()
        .readD()
        .readD()
        .readC();

    let data = {
        id: packet.data[1],
        x: packet.data[2],
        y: packet.data[3],
        z: packet.data[4],
        type: packet.data[5]
    };

    session.sendData(
        GameServerResponse.targetSelected(data.id), false
    );
}

module.exports = action;
