const SendPacket = invoke('Packet/Send');

function socialAction(id, actionId) {
    const packet = new SendPacket(0x3d);

    packet
        .writeD(id)
        .writeD(actionId);

    return packet.fetchBuffer();
}

module.exports = socialAction;
