const ServerPacket = invoke('Packet/Server');

function charSelected(actor) {
    const packet = new ServerPacket(0x15);

    packet
        .writeS(actor.model.name)
        .writeD(actor.model.id)
        .writeS(actor.model.title)
        .writeD(0x55555555)
        .writeD(0x00)  // Clan ID
        .writeD(0x00)  // ?
        .writeD(actor.model.sex)
        .writeD(actor.model.race)
        .writeD(actor.model.classId)
        .writeD(actor.model.isActive)
        .writeD(actor.model.locX)
        .writeD(actor.model.locY)
        .writeD(actor.model.locZ)
        .writeF(actor.model.hp)
        .writeF(actor.model.mp)
        .writeD(actor.model.sp)
        .writeD(actor.model.exp)
        .writeD(actor.model.level)
        .writeD(actor.model.karma)
        .writeD(actor.model.pk)
        .writeD(actor.model.base.int)
        .writeD(actor.model.base.str)
        .writeD(actor.model.base.con)
        .writeD(actor.model.base.men)
        .writeD(actor.model.base.dex)
        .writeD(actor.model.base.wit);

    for (let i = 0; i < 30; i++) {
        packet
            .writeD(0x00);
    }

    packet
        .writeD(0x00); // Game time

    return packet.fetchBuffer();
}

module.exports = charSelected;
