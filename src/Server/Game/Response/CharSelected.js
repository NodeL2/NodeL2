const ServerPacket = invoke('Packet/Server');

function charSelected(model) {
    const packet = new ServerPacket(0x15);

    packet
        .writeS(model.name)
        .writeD(model.id)
        .writeS(model.title)
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(model.sex)
        .writeD(model.race)
        .writeD(model.classId)
        .writeD(model.isActive)
        .writeD(model.locX)
        .writeD(model.locY)
        .writeD(model.locZ)
        .writeF(model.hp)
        .writeF(model.mp)
        .writeD(model.sp)
        .writeD(model.exp)
        .writeD(model.level)
        .writeD(model.karma)
        .writeD(model.pk)
        .writeD(model.int)
        .writeD(model.str)
        .writeD(model.con)
        .writeD(model.men)
        .writeD(model.dex)
        .writeD(model.wit);

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // Game time

    return packet.fetchBuffer();
}

module.exports = charSelected;
