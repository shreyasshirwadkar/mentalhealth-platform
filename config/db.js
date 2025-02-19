"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
dotenv_1.default.config({ path: ".env.local" });
if (!process.env.DATABASE_URL) {
    throw new Error("❌ DATABASE_URL is not defined in .env.local");
}
var client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
client
    .connect()
    .then(function () { return console.log("Connected to PostgreSQL"); })
    .catch(function (err) { return console.error("X PostgreSQL Connection Error:", err); });
exports.default = client;
