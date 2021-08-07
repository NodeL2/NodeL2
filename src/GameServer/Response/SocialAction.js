let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function socialAction(playerId, actionId) {
    let packet = new ChroniclePacket(socialAction.name, 9);

    packet
        .writeD(playerId)
        .writeD(actionId);

    return packet.buffer;
}

module.exports = socialAction;
