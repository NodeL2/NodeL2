const SendPacket = invoke('Server/Packet/Send');

function actionFailed() {
    return (new SendPacket(0x25)).fetchBuffer();
}

module.exports = actionFailed;
