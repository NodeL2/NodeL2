const ServerPacket = invoke('Packet/Server');

function basicActionList() {
    const packet = new ServerPacket(0xfe);

    packet
        .writeH(0x60)
        .writeD(4)
        .writeD(0)  // Sit / Stand
        .writeD(1)  // Walk / Run
        .writeD(2)  // Attack
        .writeD(5); // Pick up

    return packet.fetchBuffer();
}

module.exports = basicActionList;
