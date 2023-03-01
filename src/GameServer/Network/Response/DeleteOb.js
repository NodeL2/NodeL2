const SendPacket = invoke('Packet/Send');

function deleteOb(id) {
    const packet = new SendPacket(0x12);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = deleteOb;
