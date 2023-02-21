const SendPacket = invoke('Server/Packet/Send');

function teleportToLocation(id, data) {
    const packet = new SendPacket(0x28);

    packet
        .writeD(id)
        .writeD(data.locX)
        .writeD(data.locY)
        .writeD(data.locZ)
        .writeD(0x00)
        .writeD(data.head);

    return packet.fetchBuffer();
}

module.exports = teleportToLocation;
