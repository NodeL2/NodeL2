const ServerResponse = invoke('Server/Game/Network/Response');
const DataCache      = invoke('Server/Game/DataCache');
const ReceivePacket  = invoke('Server/Packet/Receive');
const Database       = invoke('Server/Database');

function addShortcut(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Kind
        .readD()  // Slot
        .readD()  // Id
        .readD(); // ?

    consume(session, {
           kind: packet.data[0],
           slot: packet.data[1],
             id: packet.data[2],
        unknown: packet.data[3],
    });
}

function consume(session, data) {
    const characterId = session.actor.fetchId();

    if (data.kind === 2) {
        if ((DataCache.skills.find(ob => ob.selfId === data.id))?.template?.passive) {
            return;
        }
    }

    Database.deleteShortcut(characterId, data.slot).then(() => {

        Database.setShortcut(characterId, data).then(() => {
            session.dataSend(
                ServerResponse.addShortcut(data)
            );
        });
    });
}

module.exports = addShortcut;
