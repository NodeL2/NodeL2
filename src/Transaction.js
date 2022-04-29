let Blowfish = invoke('Cipher/Blowfish');

const Transaction = {
    send: (session, data, encrypt) => {
        let size = (Buffer.alloc(2)).writeInt16LE(data.byteLength + 2);
        session.socket.write(Buffer.concat([size, encrypt ? Blowfish.encrypt(data) : data]));
    },

    receive: (session, data, opcodes) => {
        let decryptedPacket = Blowfish.decrypt(Buffer.from(data).slice(2));
        opcodes[decryptedPacket[0]](session, decryptedPacket);
    }
};

module.exports = Transaction;
