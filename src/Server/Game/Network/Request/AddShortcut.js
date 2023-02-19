const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');
const Database       = invoke('Server/Database');

function addShortcut(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Kind
        .readD()  // Slot
        .readD()  // World Id
        .readD(); // ?

    consume(session, {
           kind: packet.data[0],
           slot: packet.data[1],
        worldId: packet.data[2],
        unknown: packet.data[3],
    });
}

function consume(session, data) {
    const worldId = session.actor.fetchId();

    Database.deleteShortcut(worldId, data.slot).then(() => {

        Database.setShortcut(worldId, data).then(() => {
            session.dataSend(
                ServerResponse.addShortcut(data)
            );
        });
    });
}

module.exports = addShortcut;
