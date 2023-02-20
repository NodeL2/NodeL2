const ReceivePacket = invoke('Server/Packet/Receive');

function trashItem(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // Id
        .readD(); // Count

    consume(session, {
           id: packet.data[0],
        count: packet.data[1],
    });
}

function consume(session, data) {
    console.info(data);
}

module.exports = trashItem;
