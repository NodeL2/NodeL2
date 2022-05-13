const ClientRequest = invoke('Server/Game/Request');
const Utils = invoke('Utils');

// Establishes an `OpcodeEx` table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = new Array(0xff).fill((_, decipheredPacket) => {
            fatalError('GameServer:: unknown extended opcode 0x%s', Utils.toHex(decipheredPacket[0]));
        });

        return table;
    })()
};

module.exports = OpcodesEx;
