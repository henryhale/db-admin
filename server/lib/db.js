// supported databases
export const DATABASES = {
    MYSQL: "MySQL",
    SQLITE: "SQLite3"
};

/**
 * Generic Database class
 */ 
export class Database {
    constructor(config) {
        this.config = config;
        this.core = null;
    }

    connect() {
        throw new Error('connect method not implemented');
    }

    disconnect() {
        throw new Error('disconnect method not implemented');
    }

    query(sql, params, callback) {
        throw new Error('query method not implemented');
    }

    fetch(sql, params, callback) {
        throw new Error('fetch method not implemented');
    }
}
