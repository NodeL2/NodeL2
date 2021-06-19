let ClientPacket = invoke('ClientPacket');
let Database     = invoke('Database');
let Utils        = invoke('Utils');

function authoriseLogin(buffer) {
    let packet = new ClientPacket(buffer);

    packet
        .readB(14)  // Username
        .readB(16); // Password

    consume({
        username: Utils.toAsciiStripNull(packet.data[0]),
        password: Utils.toAsciiStripNull(packet.data[1]),
    });
}

function consume(data) {
    Database.fetchAccountPassword(data.username)
    .then((rows) => {

        if (data.password === rows[0]?.password) {
            console.log('Ok');
        }
        else {
            console.log('Nope');
        }
    });
}

module.exports = authoriseLogin;
