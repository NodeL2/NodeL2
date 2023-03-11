const World         = invoke('GameServer/World');
const ReceivePacket = invoke('Packet/Receive');

function purchase(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD()  // List Id
        .readD(); // Count

    let list = [];

    for (let i = 0; i < packet.data[1] * 2; i += 2) {
        packet
            .readD()
            .readD();

        list.push({ selfId: packet.data[2 + i], amount: packet.data[3 + i] });
    }

    consume(session, {
        listId: packet.data[0],
          list: list
    });
}

function consume(session, data) {
    World.purchaseItems(session, data.list);
}

module.exports = purchase;
