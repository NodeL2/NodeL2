class Server {
    constructor(name, optn, callback) {
        let parameters = { name: name, callback: callback };

        // Create a new listening `Server`
        require('net').createServer(this.onSocket.bind(parameters)).listen(optn.port, optn.hostname, () => {
            console.log('%s:: successful init for %s:%d', name, optn.hostname, optn.port);
        });
    }

    onSocket(socket) {
        console.log(
            '%s:: new connection received from %s:%d', this.name, socket.remoteAddress, socket.remotePort
        );

        // Generate a new `Session` for the respective `Server`. Either `AuthSession` or `GameSession`
        this.callback(socket);
    }
}

module.exports = Server;
