let ChroniclePacket = invoke('GameServer/ChroniclePacket');
let ServerPacket    = invoke('ServerPacket');

function charTemplates() {
    let packet = new ServerPacket(8);

    packet
        .writeC(ChroniclePacket.code('charTemplates'))
        .writeD(0x00);

    return packet.buffer;
}

module.exports = charTemplates;
