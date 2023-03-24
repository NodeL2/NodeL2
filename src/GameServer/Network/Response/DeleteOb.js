const SendPacket = invoke('Packet/Send');

function deleteOb(id) {
    const packet = new SendPacket(0x1e);

    packet
        .writeD(id);

    return packet.fetchBuffer();
}

module.exports = deleteOb;
