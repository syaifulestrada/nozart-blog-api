import pool from "../utils/db.js";

async function selectData() {
    try {
        const sqlSelectStatement = `SELECT * FROM categories`;

        const [rows] = pool.query(sqlSelectStatement);

        return rows;
    } catch (error) {
        throw error;
    }
}
