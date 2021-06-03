let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function unequipItem(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD();

    let data = {
        bodyPart: packet.data[1]
    };

    session.player.unequipBodyPart(session, data.bodyPart);

    session.sendData(
        GameServerResponse.userInfo(session.player), false
    );

    session.sendData(
        GameServerResponse.inventory(session.player), false
    );
}

module.exports = unequipItem;
