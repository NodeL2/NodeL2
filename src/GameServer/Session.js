let Opcodes     = invoke('GameServer/Opcodes');
let Transaction = invoke('Transaction');

class Session {
    constructor(socket) {
        this.socket = socket;
    }

    dataSend(data, encrypt = true) {
        Transaction.send(this, data, encrypt);
    }

    dataReceive(data) {
        Transaction.receive(this, data, Opcodes.table);
    }
}

module.exports = Session;
