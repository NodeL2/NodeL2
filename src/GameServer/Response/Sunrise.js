let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function sunrise() {
    let packet = new ChroniclePacket(sunrise.name);

    return packet.fetchBuffer();
}

module.exports = sunrise;
