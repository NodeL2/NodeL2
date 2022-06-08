const ServerPacket = invoke('Packet/Server');

function socialAction(playerId, actionId) {
    const packet = new ServerPacket(0x27);

    packet
        .writeD(playerId)
        .writeD(actionId);

    return packet.fetchBuffer();
}

module.exports = socialAction;
