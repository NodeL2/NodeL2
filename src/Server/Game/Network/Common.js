const ServerResponse = invoke('Server/Game/Network/Response');
const Database       = invoke('Server/Database');

const Common = {
    fetchCharacters(session) {
        const createPaperdoll = (character) => {
            return new Promise((done) => {
                Database.fetchItems(character.id).then((items) => {
                    character.paperdoll = new Array(15).fill({ "id": 0, "itemId": 0 });
                    for (const item of items.filter(ob => ob.equipped === 1)) {
                        character.paperdoll[item.slot] = { "id": item.id, "itemId": item.itemId };
                    }
                    done();
                });
            });
        }

        Database.fetchCharacters(session.accountId).then((characters) => {
            characters.reduce((previous, character) => {
                return previous.then(() => {
                    return createPaperdoll(character);
                });
            }, Promise.resolve()).then(() => {
                session.dataSend(
                    ServerResponse.charSelectInfo(characters)
                );
            });
        });
    }
};

module.exports = Common;
