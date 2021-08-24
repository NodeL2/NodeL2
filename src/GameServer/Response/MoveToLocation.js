let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function moveToLocation(id, coords) {
    let packet = new ChroniclePacket(moveToLocation.name);

    packet
        .writeD(id)
        .writeD(coords.target.x)
        .writeD(coords.target.y)
        .writeD(coords.target.z)
        .writeD(coords.origin.x)
        .writeD(coords.origin.y)
        .writeD(coords.origin.z);

    return packet.fetchBuffer();
}

module.exports = moveToLocation;
