const SendPacket = invoke('Server/Packet/Send');

function skillsList() {
    const packet = new SendPacket(0x58);

    packet
        .writeD(0x02); // Skills amount

    packet
        .writeD(0x00)  // Passive -> 0x01
        .writeD(0x01)  // Level
        .writeD(1177); // Skill Id

    packet
        .writeD(0x00)  // Passive -> 0x01
        .writeD(0x01)  // Level
        .writeD(1068); // Skill Id

    return packet.fetchBuffer();
}

module.exports = skillsList;
