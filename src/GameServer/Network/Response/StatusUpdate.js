const SendPacket = invoke('Packet/Send');

function statusUpdate(id, params = []) {
    const packet = new SendPacket(0x1a);

    packet
        .writeD(id)
        .writeD(0x04);

    params.forEach((param) => {
        packet
            .writeD(param.id)
            .writeD(param.value);
    });

    return packet.fetchBuffer();
}

module.exports = statusUpdate;
