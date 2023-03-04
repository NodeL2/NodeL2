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
    console.info(data);

    //session.dataSend(
    //    ServerResponse.npcHtml(7146, utils.parseRawFile('data/Html/Default/' + data.link))
    //);
}

module.exports = htmlLink;
