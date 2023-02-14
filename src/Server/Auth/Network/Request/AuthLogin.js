const ServerResponse = invoke('Server/Auth/Network/Response');
const ClientPacket   = invoke('Server/Packet/Client');
const Database       = invoke('Server/Database');

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

function consume(session, data) {
    Database.fetchUserPassword(data.username).then((rows) => {
        const password = rows[0]?.password;

        // Username exists in database
        if (password) {
            data.password === password ? passwordMatch(session, data.username) : failure(session, 0x02);
        }
        else { // User account does not exist, create if needed
            const optn = options.connection.AuthServer;

            if (optn.autoCreate) {
                Database.createAccount(data.username, data.password).then(() => {
                    consume(session, data);
                });
            }
            else { // Auto-create not permitted
                failure(session, 0x04);
            }
        }
    });
}

function passwordMatch(session, username) {
    session.setAccountId(username);
    session.dataSend(ServerResponse.loginSuccess(session));
}

function failure(session, reason) {
    session.dataSend(ServerResponse.loginFail(reason));
}

module.exports = authLogin;
