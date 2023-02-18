const SendPacket = invoke('Server/Packet/Send');

function showMap(itemId) {
    const packet = new SendPacket(0x9d);

    packet
        .writeD(itemId); // World = 1665, Elmore = 1863

    return packet.fetchBuffer();
}

module.exports = showMap;
