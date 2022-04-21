let { initLS } = invoke('AuthServer/Response/InitLS');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('data', this.receiveData);

        // First handshake with client
        this.sendData(
            initLS(invoke('Config').optnAuthServer.protocol), false
        );
    }

    sendData(data, encrypt = true) {
    }

    receiveData(data) {
        console.log(data);
    }
}

module.exports = Session;
