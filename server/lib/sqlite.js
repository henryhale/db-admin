import { Database, DATABASES } from './db.js';

/**
 * Database: SQLite
 */
class SQLiteDatabase extends Database {
    constructor(config) {
        super(config);
        this.dbType = DATABASES.SQLITE;
    }

    async connect() {
        const sqlite3 = (await import('sqlite3')).default.verbose();
        this.core = new sqlite3.Database(this.config.database);
    }

    disconnect() {
        if (this.core) {
            this.core.close();
        }
    }

    query(sql, params, callback) {
        if (params) {
            this.core.run(sql, params, callback);
        } else {
            this.core.run(sql, callback);
        }
    }

    fetch(sql, params, callback) {
        if (params) {
            this.core.all(sql, params, callback);
        } else {
            this.core.all(sql, callback);
        }
    }
}

export default SQLiteDatabase;
