const sqlite3 = require('sqlite3').verbose();
const IDataPersistence = require('./IDataPersistence');
const path = require('path');

class DBDataStore extends IDataPersistence {
    constructor() {
        if (DBDataStore.instance) {
            return DBDataStore.instance;
        }
        super();
        const dbPath = path.join(__dirname, '..', 'persistence', 'Azura.db');
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the vehicles database.');
        });
        
        const sql = `CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            make TEXT NOT NULL,
            model TEXT NOT NULL,
            km INTEGER NOT NULL CHECK (km >= 0),
            color TEXT NOT NULL,
            location TEXT NOT NULL,
            value DECIMAL(10,2) NOT NULL CHECK (value >= 0)
        );`;
        
        this.db.run(sql);
        DBDataStore.instance = this;
    }

    addRecord(vehicle) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO vehicles (make, model, km, color, location, value)
                        VALUES (?, ?, ?, ?, ?, ?);`;
            
            this.db.run(sql, [
                vehicle.make,
                vehicle.model,
                vehicle.km,
                vehicle.color,
                vehicle.location,
                vehicle.value
            ], function(err) {
                if (err) {
                    console.error('Error inserting vehicle:', err);
                    reject(err);
                    return;
                }
                console.log(`Vehicle added with ID: ${this.lastID}`);
                resolve(this.lastID);
            });
        });
    }

    async getAllRecords() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM vehicles;`;
            
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error('Error fetching vehicles:', err);
                    reject(err);
                    return;
                }
                console.log('Fetched rows:', rows);
                resolve(JSON.stringify(rows));
            });
        });
    }
}

module.exports = new DBDataStore();