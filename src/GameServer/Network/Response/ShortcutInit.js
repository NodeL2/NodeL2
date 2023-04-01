const SendPacket = invoke('Packet/Send');

function shortcutInit(shortcuts) {
    const packet = new SendPacket(0x57);

    packet
        .writeD(utils.size(shortcuts));

    shortcuts.forEach((shortcut) => {
        packet
            .writeD(shortcut.kind)
            .writeD(shortcut.slot)
            .writeD(shortcut.id);

        if (shortcut.kind === 2) {
            packet.
                writeD(0x01);
        }

        packet
            .writeD(shortcut.unknown);
    });

    return packet.fetchBuffer();
}

module.exports = shortcutInit;
