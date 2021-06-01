let ServerPacket = invoke('ServerPacket');

function targetSelected(targetId) {
    let packet = new ServerPacket(7);

    packet
        .writeC(0xbf)
        .writeD(targetId)
        .writeH(0x00); // Mob color based on level difference

    return packet.buffer;
}

module.exports = targetSelected;
