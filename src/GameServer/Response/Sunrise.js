let ChroniclePacket = invoke('GameServer/ChroniclePacket');
let ServerPacket    = invoke('ServerPacket');

function sunrise() {
    let packet = new ServerPacket(8);

    packet
        .writeC(ChroniclePacket.code('sunrise'));

    return packet.buffer;
}

module.exports = sunrise;
