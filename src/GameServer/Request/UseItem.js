let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function useItem(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD();

    let data = {
        id: packet.data[1]
    };

    session.player.useItem(session, data.id);

    session.sendData(
        GameServerResponse.userInfo(session.player)
    );

    session.sendData(
        GameServerResponse.inventory(session.player)
    );
}

module.exports = useItem;
