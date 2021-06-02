let ServerPacket = invoke('ServerPacket');

function systemMessage(hitDamage) {
    let text = 'You have inflicted ### damage on Elder Brown Fox';

    let packet = new ServerPacket(9 + (4 + 4));

    packet
        .writeC(0x7a)
        .writeD(35) // Message ID
        .writeD(1) // Number of texts
        .writeD(1) // Type: Number = 0x01
        .writeD(hitDamage);

    return packet.buffer;
}

module.exports = systemMessage;
