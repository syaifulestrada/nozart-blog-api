import express from "express";
import { getDataPosts } from "./controllers/postcontroller.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.json("Hello World!");
});

app.get("/posts", async (req, res) => {
    const posts = await getDataPosts();

    res.status(200).json({
        success: true,
        message: "Data successfully fetched.",
        data: posts,
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
