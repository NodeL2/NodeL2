const ReceivePacket = invoke('Server/Packet/Receive');

function trashItem(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // World Id
        .readD(); // Count

    consume(session, {
        worldId: packet.data[0],
          count: packet.data[1],
    });
}

function consume(session, data) {
    console.info(data);
}

module.exports = trashItem;
