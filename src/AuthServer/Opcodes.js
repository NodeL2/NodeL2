let ClientRequest = invoke('AuthServer/Request');
let Utils = invoke('Utils');

class Opcodes {
    static table = (() => {
        let temp = new Array(0xff).fill((_, decryptedPacket) => {
            fatalError('AuthServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        temp[0x00] = ClientRequest.authLogin;
        temp[0x05] = ClientRequest.serverList;
        temp[0x07] = ClientRequest.authGG;

        return temp;
    })();
}

module.exports = Opcodes;
