let ServerPacket = invoke('ServerPacket');

function showMap(itemId) {
    let packet = new ServerPacket(5);

    packet
        .writeC(0xb6)
        .writeD(itemId); // World = 1665, Elmore = 1863

    return packet.buffer;
}

module.exports = showMap;
