const SendPacket = invoke('Packet/Send');

function statusUpdate(id, params = []) {
    const packet = new SendPacket(0x0e);

    packet
        .writeD(id)
        .writeD(0x04);

    for (const param of params) {
        packet
            .writeD(param.id)
            .writeD(param.value);
    }

    return packet.fetchBuffer();
}

module.exports = statusUpdate;
