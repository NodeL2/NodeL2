const SendPacket = invoke('Server/Packet/Send');

function deleteOb(id) {
    const packet = new SendPacket(0x12);

    packet
        .writeD(id);

    return packet.buffer;
}

module.exports = deleteOb;
