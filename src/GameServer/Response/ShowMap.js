let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function showMap(itemId) {
    let packet = new ChroniclePacket(showMap.name, 8); // 5

    packet
        .writeD(itemId); // World = 1665, Elmore = 1863

    return packet.buffer;
}

module.exports = showMap;
