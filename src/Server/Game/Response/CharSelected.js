let ServerPacket = invoke('Packet/Server');

function charSelected(actor) {
    let packet = new ServerPacket(0x15);

    packet
        .writeS(actor.model.name)
        .writeD(actor.model.id)
        .writeS(actor.model.title)
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(actor.model.gender)
        .writeD(actor.model.raceId)
        .writeD(actor.model.classId)
        .writeD(0x01)  // ?
        .writeD(actor.model.x)
        .writeD(actor.model.y)
        .writeD(actor.model.z)
        .writeF(actor.model.hp)
        .writeF(actor.model.mp)
        .writeD(actor.model.sp)
        .writeD(actor.model.exp)
        .writeD(0x00)  // TODO: This is a hack, `exp` needs `writeQ`
        .writeD(actor.model.level)
        .writeD(actor.model.karma)
        .writeD(0x00)  // ?
        .writeD(actor.model.stats.int)
        .writeD(actor.model.stats.str)
        .writeD(actor.model.stats.con)
        .writeD(actor.model.stats.men)
        .writeD(actor.model.stats.dex)
        .writeD(actor.model.stats.wit);

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // Game time

    return packet.fetchBuffer();
}

module.exports = charSelected;
