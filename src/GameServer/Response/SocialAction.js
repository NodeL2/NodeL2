let ServerPacket = invoke('ServerPacket');

function socialAction(player, actionId) {
    let packet = new ServerPacket(5);

    packet
        .writeC(0x3d)
        .writeD(player.id)
        .writeD(actionId);

    return packet.buffer;
}

module.exports = socialAction;
