const ServerResponse = invoke('Server/Game/Network/Response');
const Database       = invoke('Server/Database');

const Common = {
    fetchCharacters(session) {
        Database.fetchCharacters(session.accountId).then((userChars) => {
            userChars.reduce((previous, nextChar) => {
                return previous.then(() => {
                    return new Promise((done) => {
                        Database.fetchItems(nextChar.id).then((items) => {
                            nextChar.paperdoll = new Array(15).fill({ "id": 0, "itemId": 0 });
                            for (const item of items.filter(ob => ob.equipped === 1)) {
                                nextChar.paperdoll[item.slot] = { "id": item.id, "itemId": item.itemId };
                            }
                            done();
                        });
                    });
                });
            }, Promise.resolve()).then(() => {
                session.dataSend(
                    ServerResponse.charSelectInfo(userChars)
                );
            });
        });
    }
};

module.exports = Common;
