const ReceivePacket = invoke('Packet/Receive');

function userCommand(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Command

    consume(session, {
        command: packet.data[0]
    });
}

function consume(session, data) {
    if (data.command === 0) {
        const actor = session.actor;
        utils.infoWarn('GameServer', 'current position is locX: ' + actor.fetchLocX() + ', locY: ' + actor.fetchLocY() + ', locZ: ' + actor.fetchLocZ() + ', head: ' + actor.fetchHead());
    }
}

module.exports = userCommand;
