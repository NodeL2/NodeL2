const SendPacket = invoke('Server/Packet/Send');

function socialAction(id, actionId) {
    const packet = new SendPacket(0x2d);

    packet
        .writeD(id)
        .writeD(actionId);

    return packet.fetchBuffer();
}

module.exports = socialAction;
