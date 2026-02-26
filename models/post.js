import pool from "../utils/db.js";

async function selectData() {
    try {
        const sqlStatement = `SELECT posts.id, posts.title, posts.content, GROUP_CONCAT(categories.name SEPARATOR ", ") AS categories, posts.created_at, posts.updated_at FROM post_categories LEFT JOIN posts ON post_categories.post_id = posts.id LEFT JOIN categories ON post_categories.category_id = categories.id GROUP BY posts.id`;

        const [rows] = await pool.query(sqlStatement);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function detailData(postId) {
    try {
        const sqlStatement = `SELECT posts.id, posts.title, posts.content, GROUP_CONCAT(categories.name SEPARATOR ", ") AS categories, posts.created_at, posts.updated_at FROM post_categories LEFT JOIN posts ON post_categories.post_id = posts.id LEFT JOIN categories ON post_categories.category_id = categories.id WHERE id = ? GROUP BY posts.id`;

        const [rows] = await pool.query(sqlStatement, postId);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function insertData(title, content) {
    try {
        const sqlStatementInsert = `INSERT INTO posts (title, content) VALUE (?, ?)`;

        const [result] = await pool.query(sqlStatementInsert, [title, content]);

        return result.insertId;
    } catch (error) {
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
        throw error;
    }
}

async function deleteData(id) {
    try {
        const sqlDeleteStatement = `DELETE FROM posts WHERE id = ?`;

        const [result] = await pool.query(sqlDeleteStatement, [id]);

        if (result.affectedRows === 0) {
            throw Object.assign(new Error("post tidak ditemukan."), {
                status: 404,
            });
        }

        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

export { selectData, insertData, updateData, deleteData };
