class Server {
    constructor(name, optn, callback) {
        const parameters = { name: name, callback: callback };

        // Create a new listening `Server`
        require('net').createServer(this.onSocket.bind(parameters)).listen(optn.port, optn.hostname, () => {
            utils.infoSuccess('%s:: successful init for %s:%d', name, optn.hostname, optn.port);
        });
    }

    onSocket(socket) {
        utils.infoSuccess(
            '%s:: new connection received from %s:%d', this.name, socket.remoteAddress, socket.remotePort
        );

        // Generates a new `Session` for the respective `Server`. Either `AuthSession` or `GameSession`
        const session = this.callback(socket);
        socket.on( 'data', session.receiveData.bind(session));
        socket.on('error', session.error.bind(session));
    }
}

module.exports = Server;
