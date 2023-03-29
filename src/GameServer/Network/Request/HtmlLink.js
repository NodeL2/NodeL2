const World         = invoke('GameServer/World/World');
const ReceivePacket = invoke('Packet/Receive');

function htmlLink(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readS();

    consume(session, {
        link: packet.data[0]
    });
}

function consume(session, data) {
    World.npcTalkResponse(session, data);
}

module.exports = htmlLink;
