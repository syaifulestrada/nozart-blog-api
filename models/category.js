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

async function updateData(name, id) {
    try {
        const sqlUpdateStatement = `UPDATE categories SET name = ? WHERE id = ?`;

        const [result] = await pool.query(sqlUpdateStatement, [name, id]);

        if (result.affectedRows === 0) {
            throw Object.assign(new Error("category tidak ditemukan."), {
                status: 404,
            });
        }

        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

async function deleteData(id) {
    try {
        const sqlDeleteStatement = `DELETE FROM categories WHERE id ?`;

        const [result] = pool.query(sqlDeleteStatement, [id]);

        if (result.affectedRows === 0) {
            throw (
                Object.assign(new Error("category tidak ditemukan.")),
                { status: 404 }
            );
        }

        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

export { selectData, insertData, updateData, deleteData };
