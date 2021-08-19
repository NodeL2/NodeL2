let ChroniclePacket = invoke('GameServer/ChroniclePacket');

function socialAction(playerId, actionId) {
    let packet = new ChroniclePacket(socialAction.name);

    packet
        .writeD(playerId)
        .writeD(actionId);

    return packet.fetchBuffer();
}

module.exports = socialAction;
