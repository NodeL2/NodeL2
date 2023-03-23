const SendPacket = invoke('Packet/Send');

function skillDurationBar(hitTime) {
    const packet  = new SendPacket(0x6d);

    packet
        .writeD(0x00) // B, R, C
        .writeD(hitTime)
        .writeD(hitTime);

    return packet.fetchBuffer();
}

module.exports = skillDurationBar;
