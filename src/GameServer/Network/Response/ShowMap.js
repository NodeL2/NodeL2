const SendPacket = invoke('Packet/Send');

function showMap(selfId) {
    const packet = new SendPacket(0xb6);

    packet
        .writeD(selfId); // World = 1665, Elmore = 1863

    return packet.fetchBuffer();
}

module.exports = showMap;
