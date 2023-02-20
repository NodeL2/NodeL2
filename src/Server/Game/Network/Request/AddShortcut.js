const ServerResponse = invoke('Server/Game/Network/Response');
const DataCache      = invoke('Server/Game/DataCache');
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

    if (data.kind === 2) {
        if ((DataCache.skills.find(ob => ob.id === data.worldId))?.passive) {
            return;
        }
    }

    Database.deleteShortcut(worldId, data.slot).then(() => {

        Database.setShortcut(worldId, data).then(() => {
            session.dataSend(
                ServerResponse.addShortcut(data)
            );
        });
    });
}

module.exports = addShortcut;
