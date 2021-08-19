let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function restart() {
    let packet = new ChroniclePacket(restart.name);

    packet
        .writeD(1);

    return packet.fetchBuffer();
}

module.exports = restart;
