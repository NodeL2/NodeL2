let ServerPacket = invoke('ServerPacket');

function socialAction(playerId, actionId) {
    let packet = new ServerPacket(9);

    packet
        .writeC(0x3d)
        .writeD(playerId)
        .writeD(actionId);

    return packet.buffer;
}

module.exports = socialAction;
