let ClientPacket = invoke('ClientPacket');

function authLogin(session, buffer) {
    let packet = new ClientPacket(buffer);
    invoke('Utils').dumpBuffer(packet.buffer);
}

function consume(session, data) {
}

module.exports = authLogin;
