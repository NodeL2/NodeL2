let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function stopMove(player) {
    let packet = new ChroniclePacket(stopMove.name);

    packet
        .writeD(player.model.id)
        .writeD(player.model.x)
        .writeD(player.model.y)
        .writeD(player.model.z);

    return packet.fetchBuffer();
}

module.exports = stopMove;
