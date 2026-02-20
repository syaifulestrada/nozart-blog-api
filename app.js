import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 300;

async function connectDB() {
    try {
        return mysql.createConnection({
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    } catch (error) {
        console.error(error);
    }
}

const connection = await connectDB();

try {
    const [results, fields] = await connection.query("SELECT * FROM posts");

    console.log(results);
    console.log(fields);
} catch (err) {
    console.log(err);
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
