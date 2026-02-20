import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

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

export default connectDB;
