let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function restart() {
    let packet = new ChroniclePacket(restart.name, 8); // 5

    packet
        .writeD(1);

    return packet.buffer;
}

module.exports = restart;
