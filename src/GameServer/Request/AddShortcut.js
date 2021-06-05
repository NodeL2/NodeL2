let ClientPacket = invoke('ClientPacket');
let GameServerResponse = invoke('GameServer/GameServerResponse');

function addShortcut(session, buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readC()
        .readD()  // Type
        .readD()  // Slot
        .readD()  // ID
        .readD(); // Unknown

    let data = {
        type    : packet.data[1],
        slot    : packet.data[2],
        id      : packet.data[3],
        unknown : packet.data[4],
    };

    switch (data.type) {
        case 1: // Item
        case 3: // Action
            session.sendData(
                GameServerResponse.addShortcutOk(data)
            );
            break;

        default:
            console.log('GS:: unknown shortcut %d', data.type);
            break;
    }
}

module.exports = addShortcut;
