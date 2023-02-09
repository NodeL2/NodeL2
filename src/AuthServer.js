class AuthServer {
    constructor(optn) {
        require('net').createServer(this.onSocket).listen(optn.Port, optn.Hostname, () => {
            infoSuccess('AuthServer:: successful init for %s:%d', optn.Hostname, optn.Port);
        });
    }

    onSocket(socket) {
        infoFail('AuthServer socket unimplemented');
    }
}

module.exports = AuthServer;
