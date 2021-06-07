let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function unequipItem(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD(); // Body part

    let data = {
        bodyPart: packet.data[1]
    };

    session.player.inventory.unequipBodyPart(session, data.bodyPart);
    session.sendData(GameServerResponse.userInfo(session.player));
    session.sendData(GameServerResponse.inventory(session.player.inventory.items));
}

module.exports = unequipItem;
