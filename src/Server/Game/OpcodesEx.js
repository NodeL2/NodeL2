const ClientRequestEx = invoke('Server/Game/Request/Ex');
const Utils           = invoke('Utils');

// Establishes an `OpcodeEx` table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = new Array(0xff).fill((_, packet) => {
            infoFail('GameServer:: unknown extended opcode 0x%s', Utils.toHex(packet[0]));
        });

        table[0x33] = ClientRequestEx.backToHall;
        table[0xa9] = ClientRequestEx.charNameCreatable;

        return table;
    })()
};

module.exports = OpcodesEx;
