const SendPacket = invoke('Server/Packet/Send');

function sitAndStand(actor) {
    const packet = new SendPacket(0x2f);

    packet
        .writeD(actor.fetchId())
        .writeD(actor.state.fetchSeated() ? 0 : 1)
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ());

    return packet.fetchBuffer();
}

module.exports = sitAndStand;
