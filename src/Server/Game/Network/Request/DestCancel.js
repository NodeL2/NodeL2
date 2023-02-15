const ReceivePacket = invoke('Server/Packet/Receive');

function destCancel(session, buffer) {
    session.actor.unselect(session);
}

module.exports = destCancel;
