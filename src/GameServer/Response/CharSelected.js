let ServerPacket = invoke('ServerPacket');

function charSelected(player) {
    let packet = new ServerPacket(
        230 + ServerPacket.strlen(player.name) + ServerPacket.strlen(player.title)
    );

    packet
        .writeC(0x21)
        .writeS(player.name)
        .writeD(player.id)
        .writeS(player.title)
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(player.gender)
        .writeD(player.raceId)
        .writeD(player.classId)
        .writeD(0x01)  // ?
        .writeD(player.x)
        .writeD(player.y)
        .writeD(player.z)
        .writeF(player.hp)
        .writeF(player.mp)
        .writeD(player.sp)
        .writeD(player.exp)
        .writeD(player.level)
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // Property: INT
        .writeD(0x00)  // Property: STR
        .writeD(0x00)  // Property: CON
        .writeD(0x00)  // Property: MEN
        .writeD(0x00)  // Property: DEX
        .writeD(0x00); // Property: WIT

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // In-game time

    return packet.buffer;
}

module.exports = charSelected;
