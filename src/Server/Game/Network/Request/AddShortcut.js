const ServerResponse = invoke('Server/Game/Network/Response');
const ReceivePacket  = invoke('Server/Packet/Receive');

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
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.addShortcut(data)
    );
}

module.exports = addShortcut;
