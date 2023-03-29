function fetchItem(id) {
    return new Promise((success, fail) => {
        let item = this.items.spawns.find(ob => ob.fetchId() === id);
        return item ? success(item) : fail();
    });
}

module.exports = fetchItem;
