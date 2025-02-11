class IDataPersistence {
    constructor() {
        if (this.constructor === IDataPersistence) {
            throw new Error("Cannot instantiate abstract class");
        }
    }

    addRecord(data) {
        throw new Error("Method 'addRecord' must be implemented");
    }

    async getAllRecords(id) {
        throw new Error("Method 'getAllRecords' must be implemented");
    }
}

module.exports = IDataPersistence;