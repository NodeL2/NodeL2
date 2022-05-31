const ClientRequestEx = invoke('Server/Game/Request/Ex');
const Utils           = invoke('Utils');

// Establishes an `OpcodeEx` table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = new Array(0x128).fill((_, packet) => {
            infoFail('GameServer:: unknown extended opcode 0x%s', Utils.toHex(packet.readUInt16LE()));
        });

        table[0x033] = ClientRequestEx.backToHall;
        table[0x0a9] = ClientRequestEx.charNameCreatable;
        table[0x103] = (_, packet) => {};

        return table;
    })()
};

module.exports = OpcodesEx;
