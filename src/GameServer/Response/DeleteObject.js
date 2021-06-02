let ServerPacket = invoke('ServerPacket');

function deleteObject(id) {
    let packet = new ServerPacket(5);

    packet
        .writeC(0x1e)
        .writeD(id);

    return packet.buffer;
}

module.exports = deleteObject;
