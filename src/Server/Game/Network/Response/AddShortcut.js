const SendPacket = invoke('Server/Packet/Send');

function addShortcut(data) {
    const packet = new SendPacket(0x44);

    packet
        .writeD(data.kind)
        .writeD(data.slot)
        .writeD(data.id);

    return packet.fetchBuffer();
}

module.exports = addShortcut;
