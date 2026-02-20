import pool from "../utils/db.js";

async function selectData() {
    try {
        const sqlStatement = "SELECT * FROM posts";

        const [rows] = await pool.query(sqlStatement);

        return rows;
    } catch (err) {
        console.error(err);
    }
}

async function insertData(title, content) {
    try {
        const sqlStatementInsert = `INSERT INTO posts (title, content) VALUE (?, ?)`;

        const [result] = await pool.query(sqlStatementInsert, [title, content]);

        const sqlStatementSelectById = `SELECT * FROM posts WHERE id = ?`;

        const [rows] = await pool.query(sqlStatementSelectById, [
            result.insertId,
        ]);

        return rows[0];
    } catch (err) {
        console.error(err);
    }
}

export { selectData, insertData };
