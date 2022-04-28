let ServerResponse = invoke('AuthServer/Response');
let Transaction    = invoke('AuthServer/Transaction');

class Session {
    constructor(socket) {
        this.socket = socket;

        // First handshake with client
        this.dataSend(
            ServerResponse.initLS(invoke('Config').authServer.protocol), false
        );
    }

    dataSend(data, encrypt = true) {
        Transaction.send(this, data, encrypt);
    }

    dataReceive(data) {
        Transaction.receive(this, data);
    }
}

module.exports = Session;
