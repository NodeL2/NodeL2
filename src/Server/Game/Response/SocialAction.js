const ServerPacket = invoke('Packet/Server');

function socialAction(actorId, actionId) {
    const packet = new ServerPacket(0x27);

    packet
        .writeD(actorId)
        .writeD(actionId);

    return packet.fetchBuffer();
}

module.exports = socialAction;
