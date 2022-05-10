let ServerPacket = invoke('Packet/Server');

function charSelected(actor) {
    let packet = new ServerPacket(0x0b);

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
        .writeD(0x00)  // TODO: This is a hack, `exp` needs `writeQ`
        .writeD(actor.model.exp)
        .writeD(0x00)  // TODO: This is a hack, `exp` needs `writeQ`
        .writeD(actor.model.level)
        .writeD(0x00)  // Reputation, not karma
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
