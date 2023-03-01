const ItemModel = invoke('GameServer/Model/Item');

class Item extends ItemModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.setId(id);
    }
}

module.exports = Item;
