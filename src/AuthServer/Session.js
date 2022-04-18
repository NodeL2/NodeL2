let { initLS } = invoke('AuthServer/Response/InitLS');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.socket.on('data', this.receiveData);

        // First handshake with client
        let { optnAuthServer: optn } = invoke('Config');
        this.sendData(
            initLS(optn.protocol), false
        );
    }

    sendData(data, encrypt = true) {
    }

    receiveData(data) {
        console.log(data);
    }
}

module.exports = Session;
