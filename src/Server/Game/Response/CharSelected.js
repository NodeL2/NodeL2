const ServerPacket = invoke('Packet/Server');

function charSelected(actor) {
    const packet = new ServerPacket(0x0b);

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
        .writeD(0x01)  // Active?
        .writeD(actor.model.locX)
        .writeD(actor.model.locY)
        .writeD(actor.model.locZ)
        .writeF(actor.model.hp)
        .writeF(actor.model.mp)
        .writeD(actor.model.sp)
        .writeD(0x00)  // TODO: This is a hack, needs `writeQ`
        .writeD(actor.model.exp)
        .writeD(0x00)  // TODO: This is a hack, needs `writeQ`
        .writeD(actor.model.level)
        .writeD(actor.model.reputation)
        .writeD(actor.model.pk)
        .writeD(0x00)  // Game time
        .writeD(0x00)  // ?
        .writeD(0x00)  // Class Id
        .writeB(Buffer.alloc(16))
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeB(Buffer.alloc(28))
        .writeD(0x00); // ?

    return packet.fetchBuffer();
}

module.exports = charSelected;
