let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function questList() {
    let packet = new ChroniclePacket(questList.name);

    packet
        .writeH(0x00)
        .writeH(0x00);

    return packet.fetchBuffer();
}

module.exports = questList;
