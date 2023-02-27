const BackpackModel = invoke('GameServer/Model/Backpack');
const DataCache     = invoke('GameServer/DataCache');

class Backpack extends BackpackModel {
    constructor(data) {
        // Parent inheritance
        super(data.paperdoll);
        this.processDetails(DataCache.items);

        // Local
        delete this.model.items;
        delete this.model.paperdoll;
    }

    processDetails(items) {
        items.forEach((item) => {
            const details = DataCache.items.find(ob => ob.selfId === item.selfId);
            this.items.push({
                ...item, ...utils.crushOb(details ?? {})
            });
        });
    }
}

module.exports = Backpack;
