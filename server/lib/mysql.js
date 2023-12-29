import { Database, DATABASES } from './db.js';

/**
 * Database: MySQL
 */ 
class MySQLDatabase extends Database {
    constructor(config) {
        super(config);
        this.dbType = DATABASES.MYSQL;
    }

    async connect() {
        const mysql = (await import('mysql2')).default;
        this.core = mysql.createConnection(this.config);
        this.core.connect();
    }

    disconnect() {
        if (this.core) {
            this.core.end();
        }
    }

    query(sql, params, callback) {
        if (params) {
            this.core.execute(sql, params, callback);
        } else {
            this.core.query(sql, callback);
        }
    }

    fetch(sql, params, callback) {
        this.query(sql, params, callback);
    }
}

export default MySQLDatabase;