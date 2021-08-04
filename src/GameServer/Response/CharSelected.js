let ServerPacket = invoke('ServerPacket');
let Utils        = invoke('Utils');

function charSelected(player) {
    let info   = player.model;
    let packet = new ServerPacket(
        232 + Utils.textLength(info.name) + Utils.textLength(info.title ?? '')
    ); //229

    packet
        .writeC(0x21)
        .writeS(info.name)
        .writeD(info.id)
        .writeS(info.title ?? '')
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(info.gender)
        .writeD(info.raceId)
        .writeD(info.classId)
        .writeD(0x01)  // ?
        .writeD(info.x)
        .writeD(info.y)
        .writeD(info.z)
        .writeF(info.hp)
        .writeF(info.mp)
        .writeD(info.sp)
        .writeD(info.exp)
        .writeD(info.level)
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(info.int)
        .writeD(info.str)
        .writeD(info.con)
        .writeD(info.men)
        .writeD(info.dex)
        .writeD(info.wit);

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // In-game time

    return packet.buffer;
}

module.exports = charSelected;
