let ServerPacket = invoke('ServerPacket');

function charSelected(player) {
    let packet = new ServerPacket(
        229 + ServerPacket.strlen(player.name) + ServerPacket.strlen(player.title)
    );

    packet
        .writeC(0x21)
        .writeS(player.name)
        .writeD(player.id)
        .writeS(player.title)
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(player.model.gender)
        .writeD(player.raceId)
        .writeD(player.classId)
        .writeD(0x01)  // ?
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z)
        .writeF(player.model.hp)
        .writeF(player.model.mp)
        .writeD(player.model.sp)
        .writeD(player.model.exp)
        .writeD(player.model.level)
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(player.model.int)
        .writeD(player.model.str)
        .writeD(player.model.con)
        .writeD(player.model.men)
        .writeD(player.model.dex)
        .writeD(player.model.wit);

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // In-game time

    return packet.buffer;
}

module.exports = charSelected;
