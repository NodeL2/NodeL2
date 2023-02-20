const SendPacket = invoke('Server/Packet/Send');

function destDeselected(actor) {
    const packet = new SendPacket(0x2a);

    packet
        .writeD(actor.fetchId())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ());

    return packet.fetchBuffer();
}

module.exports = destDeselected;
