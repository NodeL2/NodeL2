let Utils = invoke('Utils');

const Opcodes = {
    table: (() => {
        let table = new Array(0xff).fill((_, decryptedPacket) => {
            fatalError('GameServer:: unknown opcode 0x%s', Utils.toHex(decryptedPacket[0], 2));
        });

        return table;
    })()
};

module.exports = Opcodes;
