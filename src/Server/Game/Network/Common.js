const ServerResponse = invoke('Server/Game/Network/Response');
const Database       = invoke('Server/Database');

const Common = {
    fetchItems(characterId) {
        var sequence = Promise.resolve();

        Database.fetchItems(characterId).then((items) => {
            console.info('Processing');
            return items.filter(ob => ob.equipped === true);
        });

        console.info('What');
        return [];
    },

    fetchCharacters(session) {
        Database.fetchCharacters(session.accountId).then((userChars) => {
            for (const char of userChars) {
                char.paperdoll = new Array(0xff).fill(0);

                for (const item of Common.fetchItems(char.id)) {
                    char.paperdoll[item.slot] = { "id": item.id, "itemId": item.itemId };
                }
            }

            session.dataSend(
                ServerResponse.charSelectInfo(userChars)
            );
        });
    }
};

module.exports = Common;
