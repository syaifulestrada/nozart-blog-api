import connectDB from "../utils/db.js";

async function selectData() {
    try {
        const connection = await connectDB();

        const sqlStatement = "SELECT * FROM posts";

        const [rows] = await connection.query(sqlStatement);

        return rows;
    } catch (err) {
        console.error(err);
    }
}

async function insertData(title, content) {
    try {
        const connection = await connectDB();

        const sqlStatementInsert = `INSERT INTO posts (title, content) VALUE (?, ?)`;

        const [result] = await connection.query(sqlStatementInsert, [
            title,
            content,
        ]);

        const sqlStatementSelectById = `SELECT * FROM posts WHERE id = ?`;

        const [rows] = await connection.query(sqlStatementSelectById, [
            result["insertId"],
        ]);

        return rows;
    } catch (err) {
        console.error(err);
    }
}

export { selectData, insertData };
