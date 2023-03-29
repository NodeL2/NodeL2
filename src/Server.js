class Server {
    constructor(name, optn, callback) {
        const parameters = { name: name, callback: callback };

        // Create a new listening `Server`
        require('net').createServer(this.onSocket.bind(parameters)).listen(optn.port, optn.hostname, () => {
            utils.infoSuccess(name, 'successful init for %s:%d', optn.hostname, optn.port);
        });
    }

    onSocket(socket) {
        utils.infoSuccess(
            this.name, 'new connection received from %s:%d', socket.remoteAddress, socket.remotePort
        );

        // Generates a new `Session` for the respective `Server`. Either `AuthSession` or `GameSession`
        const session = this.callback(socket);
        socket.on( 'data', session.dataReceive.bind(session));
        socket.on('error', session.error.bind(session));
    }
}

module.exports = Server;
