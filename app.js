import express from "express";
import connectDB from "./utils/db.js";

const app = express();
const port = 300;

const connection = await connectDB();

try {
    const [results, fields] = await connection.query("SELECT * FROM posts");

    console.log(results);
} catch (err) {
    console.log(err);
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
