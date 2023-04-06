const SendPacket = invoke('Packet/Send');

function askForTeamUp(id, distribution) {
    const packet = new SendPacket(0x39);

    packet
        .writeD(id)
        .writeD(distribution);

    return packet.fetchBuffer();
}

module.exports = askForTeamUp;
