import express from "express";
import helmet from "helmet";

// load .env file
import "dotenv/config.js";

// create database connection basing on .env file
import loadDatabase from "./lib/index.js";

const port = process.env.PORT || 8000;
const app = express();
const db = await loadDatabase();

process.on("exit", () => db.disconnect());

app.use(express.static("client/dist"));

// parse json requests
app.use(express.json());

app.use(helmet());

// client api route to handle post request
app.post("/api", (req, res) => {
    const { sql, params: p } = req.body;
    const isSelect = sql.toLowerCase().startsWith("select");
    const hasParameters = sql.indexOf("?") !== -1;
    const params = hasParameters ? p.split(",") : null;

    function callback(error, result) {
        if (!error) {
            res.json({ db: db.dbType, result });
        } else {
            error = db.dbType.toLowerCase() + ": " + (error?.message || error);
            res.status(500)
                .json({ db: db.dbType, error });
        }
    }

    if (isSelect) {
        db.fetch(sql, params, callback);
    } else {
        db.query(sql, params, callback);
    }
});

// start server...
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});