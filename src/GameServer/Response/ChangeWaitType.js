let ServerPacket = invoke('ServerPacket');

function changeWaitType(player) {
    let packet = new ServerPacket(21);

    packet
        .writeC( 0x3f)
        .writeD( player.id)
        .writeD(!player.state.raw.isSitting)
        .writeD( player.model.x)
        .writeD( player.model.y)
        .writeD( player.model.z);

    return packet.buffer;
}

module.exports = changeWaitType;
