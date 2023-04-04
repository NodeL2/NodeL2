const SendPacket = invoke('Packet/Send');

function skillDurationBar(hitTime, color = 0) {
    const packet  = new SendPacket(0x85);

    packet
        .writeD(color) // B, R, C
        .writeD(hitTime)
        .writeD(hitTime);

    return packet.fetchBuffer();
}

module.exports = skillDurationBar;
