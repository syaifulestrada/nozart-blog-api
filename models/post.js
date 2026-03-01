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
        const sqlStatement = `SELECT posts.id, posts.title, posts.content, GROUP_CONCAT(categories.name SEPARATOR ", ") AS categories, posts.created_at, posts.updated_at FROM post_categories LEFT JOIN posts ON post_categories.post_id = posts.id LEFT JOIN categories ON post_categories.category_id = categories.id WHERE posts.id = ? GROUP BY posts.id`;

        const [rows] = await pool.query(sqlStatement, [postId]);

        if (rows.length === 0) {
            throw Object.assign(new Error("post tidak ditemukan."), {
                status: 404,
            });
        }

        return rows;
    } catch (error) {
        throw error;
    }
}

async function insertData(title, content, cover, categoryIds) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const sqlStatementInsert = `INSERT INTO posts (title, content) VALUE (?, ?, ?)`;

        const [result] = await connection.query(sqlStatementInsert, [
            title,
            content,
            cover?.path ?? null,
        ]);

        const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
        const postId = result.insertId;

        if (ids.length > 0) {
            const values = ids.map((categoryId) => [postId, categoryId]);

            const insertPostCategoriesQuery = `INSERT INTO post_categories (post_id, category_id) VALUES ?`;

            await connection.query(insertPostCategoriesQuery, [values]);
        }

        await connection.commit();
        return result.insertId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function updateData(title, content, postId, categoryIds) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const sqlUpdateStatement = `UPDATE posts 
            SET title = COALESCE(?, title), content = COALESCE(?, content)
            WHERE id = ?`;

        const [result] = await connection.query(sqlUpdateStatement, [
            title ?? null,
            content ?? null,
            postId,
        ]);

        if (result.affectedRows === 0) {
            throw Object.assign(new Error("post tidak ditemukan."), {
                status: 404,
            });
        }

        if (categoryIds !== undefined) {
            await connection.query(
                "DELETE FROM post_categories WHERE post_id = ?",
                [postId],
            );

            const ids = Array.isArray(categoryIds)
                ? categoryIds
                : [categoryIds];

            if (ids.length > 0) {
                const values = ids.map((categoryId) => [postId, categoryId]);

                await connection.query(
                    "INSERT INTO post_categories (post_id, category_id) VALUES ?",
                    [values],
                );
            }
        }

        await connection.commit();
        return result.affectedRows;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
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

export { selectData, insertData, updateData, deleteData, detailData };
