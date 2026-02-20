import express, { json } from "express";
import { getDataPosts, insertDataPosts } from "./controllers/postcontroller.js";

const app = express();
const port = 3000;

app.use(json());

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

app.post("/posts", async (req, res) => {
    const posts = await insertDataPosts(req.body.title, req.body.content);
    res.status(200).json({
        success: true,
        message: "Data successfully created.",
        data: posts,
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
