let ServerPacket = invoke('ServerPacket');
let Utils        = invoke('Utils');

function charSelected(player) { // 229 bytes without strings
    let packet = new ServerPacket(
        232 + Utils.textLength(player.model.name) + Utils.textLength(player.model.title)
    );

    packet
        .writeC(0x21)
        .writeS(player.model.name)
        .writeD(player.model.id)
        .writeS(player.model.title)
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(player.model.gender)
        .writeD(player.model.raceId)
        .writeD(player.model.classId)
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
        .writeD(player.model.stats.int)
        .writeD(player.model.stats.str)
        .writeD(player.model.stats.con)
        .writeD(player.model.stats.men)
        .writeD(player.model.stats.dex)
        .writeD(player.model.stats.wit);

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // In-game time

    return packet.buffer;
}

module.exports = charSelected;
