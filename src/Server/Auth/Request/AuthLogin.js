const ClientPacket = invoke('Packet/Client');
const Database     = invoke('Database');

function authLogin(session, buffer) {
    const packet = new ClientPacket(buffer);

    packet
        .readB(14)  // Username
        .readB(16); // Password

    consume(session, {
        username: utils.stripNull(packet.data[0]),
        password: utils.stripNull(packet.data[1]),
    });
}

function consume(session, data) { // TODO: Check the Session ID
    Database.fetchUserPassword(data.username).then((rows) => {
        const password = rows[0]?.password;

        // Username exists in database
        if (password) {
            data.password === password ? passwordMatch(session, data.username) : failure(session, 0x02);
        }
        else { // User account does not exist, create if needed
            utils.infoWarn('No account bro');

            if (options.connection.AuthServer.autoCreate) {
                Database.createAccount(data.username, data.password).then(() => {
                    consume(session, data);
                });
            }
            else { // Auto-create not permitted
                utils.infoWarn('Account auto-created prohibited');
            }
        }
    });
}

function passwordMatch(session, username) {
    utils.infoSuccess('Password match, ok');
}

function failure(session, reason) {
    utils.infoWarn('Wron pass, k?');
}

module.exports = authLogin;
