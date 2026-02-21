import pool from "../utils/db.js";

async function selectData() {
    try {
        const sqlStatement = "SELECT * FROM posts";

        const [rows] = await pool.query(sqlStatement);

        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function insertData(title, content) {
    try {
        const sqlStatementInsert = `INSERT INTO posts (title, content) VALUE (?, ?)`;

        const [result] = await pool.query(sqlStatementInsert, [title, content]);

        return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateData(payload, id) {
    try {
        const sqlUpdateStatement = `UPDATE posts 
            SET title = COALESCE(?, title), content = COALESCE(?, content)
            WHERE id = ?`;

        const [result] = await pool.query(sqlUpdateStatement, [
            payload.title || null,
            payload.content || null,
            id,
        ]);

        if (result.affectedRows === 0) {
            throw Object.assign(new Error("post tidak ditemukan."), {
                status: 404,
            });
        }

        return result.affectedRows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteData(id) {
    try {
        const sqlDeleteStatement = `DELETE FROM posts WHERE id = ?`;

        const [result] = await pool.query(sqlDeleteStatement, [id]);

        return result.affectedRows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { selectData, insertData, updateData, deleteData };
