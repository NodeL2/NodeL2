const SendPacket = invoke('Server/Packet/Send');

function die(id) {
    const packet = new SendPacket(0x06);

    packet
        .writeD(id)    // Id
        .writeD(0x01)  // Teleport
        .writeD(0x01)  // ?
        .writeD(0x01)  // ?
        .writeD(0x01)  // ?
        .writeD(0x00)  // ?
        .writeD(0x01); // ?

    return packet.fetchBuffer();
}

module.exports = die;
