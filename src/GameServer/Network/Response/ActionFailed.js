const SendPacket = invoke('Packet/Send');

function actionFailed() {
    return (new SendPacket(0x35)).fetchBuffer();
}

module.exports = actionFailed;
