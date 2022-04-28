let Blowfish      = invoke('Cipher/Blowfish');
let ClientRequest = invoke('AuthServer/Request');
let Utils         = invoke('Utils');

const Transaction = {
    opcodes: (() => {
        let table = new Array(0xff).fill((_, decryptedPacket) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        table[0x00] = ClientRequest.authLogin;
        table[0x05] = ClientRequest.serverList;
        table[0x07] = ClientRequest.authGG;

        return table;
    })(),

    send: (session, data, encrypt) => {
        const size = (Buffer.alloc(2)).writeInt16LE(data.byteLength + 2);
        session.socket.write(Buffer.concat([size, encrypt ? Blowfish.encrypt(data) : data]));
    },

    receive: (session, data) => {
        const decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        Transaction.opcodes[decryptedPacket[0]](session, decryptedPacket);
    }
};

module.exports = Transaction;
