let ServerPacket = invoke('ServerPacket');

function cryptInit(xorKey) {
    let packet = new ServerPacket(12);

    packet
        .writeC(0x00)
        .writeC(0x01)
        .writeC(xorKey[0])
        .writeC(xorKey[1])
        .writeC(xorKey[2])
        .writeC(xorKey[3])
        .writeC(xorKey[4])
        .writeC(xorKey[5])
        .writeC(xorKey[6])
        .writeC(xorKey[7]);

    return packet.buffer;
}

module.exports = cryptInit;
