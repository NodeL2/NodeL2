const SendPacket = invoke('Server/Packet/Send');

function socialAction(actorId, actionId) {
    const packet = new SendPacket(0x2d);

    packet
        .writeD(actorId)
        .writeD(actionId);

    return packet.fetchBuffer();
}

module.exports = socialAction;
