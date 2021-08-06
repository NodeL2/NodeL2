let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function moveToLocation(id, coords) {
    let packet = new ChroniclePacket(moveToLocation.name, 32); // 29

    packet
        .writeD(id)
        .writeD(coords.target.x)
        .writeD(coords.target.y)
        .writeD(coords.target.z)
        .writeD(coords.origin.x)
        .writeD(coords.origin.y)
        .writeD(coords.origin.z);

    return packet.buffer;
}

module.exports = moveToLocation;
