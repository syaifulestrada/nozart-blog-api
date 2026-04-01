import express, { json } from "express";
import {
    getDataPosts,
    getDetailData,
    insertDataPosts,
    updateDataPosts,
    deleteDataPosts,
} from "./controllers/postcontroller.js";
import categoryRoute from "./routes/category.js";

const app = express();
const port = 3000;

app.use(json());

app.use((req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return next(Object.assign(new Error("Unauthorized."), { status: 401 }));
    }

    next();
});

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

app.get("/posts/:id", async (req, res, next) => {
    try {
        const post = await getDetailData(req.params.id);

        res.status(200).json({
            success: true,
            message: "Berhasil menampilkan detail data post.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

app.post("/posts", async (req, res, next) => {
    try {
        const { title, content, categoryIds } = req.body;
        const post = await insertDataPosts(title, content, categoryIds);

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
        const postId = req.params.id;
        const { title, content, categoryIds } = req.body;
        const post = await updateDataPosts(title, content, postId, categoryIds);

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

app.use("/api/categories", categoryRoute);

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        success: false,
        message: error.message,
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
