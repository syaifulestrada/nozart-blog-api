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

        const sqlStatement = `INSERT INTO posts (title, content) VALUE ("${title}"  , "${content}")`;

        const [result] = await connection.query(sqlStatement);

        return result;
    } catch (err) {
        console.error(err);
    }
}

export { selectData, insertData };
