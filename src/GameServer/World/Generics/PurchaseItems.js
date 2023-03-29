function purchaseItems(session, items) {
    let timer = 0; // TODO: Bullcrap

    items.forEach((item) => {
        setTimeout(() => {
            this.purchaseItem(session, item.selfId, item.amount);
        }, timer += 100);
    });
}

module.exports = purchaseItems;
