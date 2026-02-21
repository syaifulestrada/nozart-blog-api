import express, { json } from "express";
import {
    getDataPosts,
    insertDataPosts,
    updateDataPosts,
    deleteDataPosts,
} from "./controllers/postcontroller.js";
import {
    getDataCategories,
    insertDataCategories,
    updateDataCategories,
    deleteDataCategories,
} from "./controllers/categorycontroller.js";

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
        message: "Data berhasil ditampilkan.",
        data: posts,
    });
});

app.post("/posts", async (req, res, next) => {
    try {
        const post = await insertDataPosts(req.body.title, req.body.content);

        res.status(201).json({
            success: true,
            message: "Data berhasil dibuat.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

app.patch("/posts", (req, res, next) => {
    next(
        Object.assign(new Error("post id pada url wajib diisi."), {
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
            message: "Data berhasil diubah.",
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
            message: "Data berhasil dihapus.",
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
            message: "Data berhasil ditampilkan.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

app.post("/categories", async (req, res, next) => {
    try {
        const category = await insertDataCategories(req.body.name);

        res.status(201).json({
            success: true,
            message: "Data berhasil dibuat.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

app.patch("/categories", (req, res, next) => {
    next(
        Object.assign(new Error("category id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

app.patch("/categories/:id", async (req, res, next) => {
    try {
        const category = await updateDataCategories(
            req.body.name,
            req.params.id,
        );

        res.status(201).json({
            success: true,
            message: "Data berhasil diubah.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

app.delete("/categories", async (req, res, next) => {
    next(
        Object.assign(new Error("category id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

app.delete("/categories/:id", async (req, res, next) => {
    try {
        const category = await deleteDataCategories(req.params.id);

        res.status(201).json({
            success: true,
            message: "Data berhasil dihapus.",
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
