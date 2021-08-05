let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function questList() {
    let packet = new ChroniclePacket(questList.name, 8);

    packet
        .writeH(0x00)
        .writeH(0x00);

    return packet.buffer;
}

module.exports = questList;
