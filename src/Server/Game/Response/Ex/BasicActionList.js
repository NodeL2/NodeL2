const ServerPacket = invoke('Packet/Server');

function basicActionList() {
    const packet = new ServerPacket(0xfe);

    packet
        .writeH(0x60)
        .writeD(16)

        .writeD( 0)  // Sit / Stand
        .writeD( 1)  // Walk / Run
        .writeD( 2)  // Attack
        .writeD( 5)  // Pick up

        .writeD(12)  // Emote: Greeting
        .writeD(13)  // Emote: Victory
        .writeD(14)  // Emote: Advance
        .writeD(24)  // Emote: Yes
        .writeD(25)  // Emote: No
        .writeD(26)  // Emote: Bow
        .writeD(29)  // Emote: Unaware
        .writeD(30)  // Emote: Social Waiting
        .writeD(31)  // Emote: Laugh
        .writeD(33)  // Emote: Applaud
        .writeD(34)  // Emote: Dance
        .writeD(35); // Emote: Sorrow
        
        // Recommend: 40

    return packet.fetchBuffer();
}

module.exports = basicActionList;
