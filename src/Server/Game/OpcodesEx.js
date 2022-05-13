const ClientRequest = invoke('Server/Game/Request');
const Utils = invoke('Utils');

// Establishes an `OpcodeEx` table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = new Array(0xff).fill((_, packet) => {
            fatalError('GameServer:: unknown extended opcode 0x%s', Utils.toHex(packet[0]));
        });

        return table;
    })()
};

module.exports = OpcodesEx;
