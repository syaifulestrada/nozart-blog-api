import pool from "../utils/db.js";

async function selectData() {
    try {
        const sqlSelectStatement = `SELECT * FROM categories`;

        const [rows] = await pool.query(sqlSelectStatement);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function insertData(name) {
    try {
        const sqlInsertStatement = `INSERT INTO categories (name) VALUE (?)`;

        const [result] = await pool.query(sqlInsertStatement, [name]);

        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

export { selectData, insertData };
