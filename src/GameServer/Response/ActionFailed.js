let ServerPacket = invoke('ServerPacket');

function actionFailed(player) {
    let packet = new ServerPacket(5);

    packet
        .writeC(0x35);

    return packet.buffer;
}

module.exports = actionFailed;
