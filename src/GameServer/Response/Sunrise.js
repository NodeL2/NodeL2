let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function sunrise() {
    let packet = new ChroniclePacket(sunrise.name, 8);

    return packet.buffer;
}

module.exports = sunrise;
