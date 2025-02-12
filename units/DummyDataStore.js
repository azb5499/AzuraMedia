const IDataPersistence = require("./IDataPersistence.js");

class DummyStore extends IDataPersistence {
    constructor() {
        if (DummyStore.instance) {
            return DummyStore.instance;
        }
        super();
        this.data = [];
        this.dataSize = 0;
        DummyStore.instance = this;
    }

    addRecord(record) {
        this.dataSize++;
        record.id = this.dataSize;
        this.data.push(record);
        console.log(`DummyStore: Saved data ${JSON.stringify(record)}`);
    }

    getAllRecords(id) {
        return JSON.stringify(this.data || null);
    }

    toStringNow() {
        console.log("Hello DummyStore");
    }
}

module.exports = new DummyStore(); // Export instance