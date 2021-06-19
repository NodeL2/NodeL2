class Session {
    constructor(socket) {
        this.socket = socket;
    }

    receiveData(data) {
        console.log(data);
    }

    sendData(data) {
        let header = Buffer.alloc(2);
        header.writeInt16LE(data.length + 2);

        this.socket.write(
            Buffer.concat([header, data])
        );
    }
}

module.exports = Session;
