let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function showMap(itemId) {
    let packet = new ChroniclePacket(showMap.name);

    packet
        .writeD(itemId); // World = 1665, Elmore = 1863

    return packet.fetchBuffer();
}

module.exports = showMap;
