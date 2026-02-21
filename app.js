import express, { json } from "express";
import {
    getDataPosts,
    insertDataPosts,
    updateDataPosts,
    deleteDataPosts,
} from "./controllers/postcontroller.js";
import { getDataCategories } from "./controllers/categorycontroller.js";

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

app.post("/posts", async (req, res, next) => {
    try {
        const post = await insertDataPosts(req.body.title, req.body.content);

        res.status(201).json({
            success: true,
            message: "Data successfully created.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

app.patch("/posts", (req, res, next) => {
    next(
        Object.assign(new Error("post id pada url wajib dii si."), {
            status: 400,
        }),
    );
});

app.patch("/posts/:id", async (req, res, next) => {
    try {
        const post = await updateDataPosts(
            req.body.title,
            req.body.content,
            req.params.id,
        );

        res.status(201).json({
            success: true,
            message: "Data successfully updated.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

app.delete("/posts", (req, res, next) => {
    next(
        Object.assign(new Error("post id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

app.delete("/posts/:id", async (req, res, next) => {
    try {
        const post = await deleteDataPosts(req.params.id);

        res.status(201).json({
            success: true,
            message: "Data successfully deleted.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

app.get("/categories", async (req, res, next) => {
    try {
        const category = await getDataCategories();

        res.status(200).json({
            success: true,
            message: "Data successfully fetched.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        success: false,
        message: error.message,
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
