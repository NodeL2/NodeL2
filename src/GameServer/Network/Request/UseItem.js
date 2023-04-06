const ServerResponse = invoke('GameServer/Network/Response');
const ReceivePacket  = invoke('Packet/Receive');

function useItem(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Id

    consume(session, {
        id: packet.data[0]
    });
}

function consume(session, data) {
    session.actor.backpack.useItem(session, data.id);
    session.dataSendToMeAndOthers(ServerResponse.userInfo (session.actor), session.actor);
    session.dataSendToMe(ServerResponse.itemsList(session.actor.backpack.fetchItems()));
}

module.exports = useItem;
