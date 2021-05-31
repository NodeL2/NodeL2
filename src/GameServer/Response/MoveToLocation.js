let ServerPacket = invoke('ServerPacket');

function moveToLocation(id, coords) {
    let packet = new ServerPacket(29);

    packet
        .writeC(0x01)
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
