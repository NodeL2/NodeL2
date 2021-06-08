let ServerPacket = invoke('ServerPacket');

function attack(player, npcId) {
    let packet = new ServerPacket(28);

    packet
        .writeC(0x06)
        .writeD(player.id)
        .writeD(npcId)
        .writeD(1) // Damage
        .writeC(0) // Hit
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z)
        .writeH(0);

    return packet.buffer;
}

module.exports = attack;
