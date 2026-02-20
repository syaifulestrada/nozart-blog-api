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

export { selectData };
