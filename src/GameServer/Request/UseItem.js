let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function useItem(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD(); // Item ID

    let data = {
        id: packet.data[1]
    };

    session.player.inventory.useItem(session, data.id);
    session.sendData(GameServerResponse.userInfo(session.player));
    session.sendData(GameServerResponse.inventory(session.player.inventory.items));
}

module.exports = useItem;
