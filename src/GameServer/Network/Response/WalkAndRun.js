const SendPacket = invoke('Packet/Send');

function walkAndRun(actor) {
    const packet = new SendPacket(0x2e);

    packet
        .writeD(actor.fetchId())
        .writeD(actor.state.fetchWalkin() ? 0 : 1)
        .writeD(0x00); // C2?

    return packet.fetchBuffer();
}

module.exports = walkAndRun;
