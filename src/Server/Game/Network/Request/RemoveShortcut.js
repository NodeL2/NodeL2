const ReceivePacket = invoke('Server/Packet/Receive');
const Database      = invoke('Server/Database');

function removeShortcut(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Slot

    consume(session, {
        slot: packet.data[0]
    });
}

function consume(session, data) {
    Database.deleteShortcut(session.actor.fetchId(), data.slot);
}

module.exports = removeShortcut;
