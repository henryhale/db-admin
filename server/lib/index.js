import { DATABASES } from "./db.js";

// get database type
const dbType = process.env.DB_TYPE;

// database configuration from loaded .env file
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

// function to create specified database connection
async function loadDatabase() {
    const isSqlite3 = DATABASES.SQLITE.toLowerCase() === dbType.toLowerCase();
    const DBConstructor = await (
        isSqlite3 ? import("./sqlite.js") : import("./mysql.js")
    );
    const db = new DBConstructor.default(config);
    await db.connect();
    return db;
}

export default loadDatabase;
