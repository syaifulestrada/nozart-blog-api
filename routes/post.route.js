import express from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import {
    getDataPosts,
    getDetailData,
    insertDataPosts,
    updateDataPosts,
    deleteDataPosts,
} from "../controllers/postcontroller.js";

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const dir = "storage/post/img";
        try {
            await fs.mkdir(dir, { recursive: true });
            cb(null, dir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const router = express.Router();
const upload = multer({ storage });

router.get("/", async (req, res) => {
    const posts = await getDataPosts();

    if (posts.length === 0) {
        res.status(200).json({
            success: true,
            message: "Data post belum ada.",
            data: posts,
        });
    }

    res.status(200).json({
        success: true,
        message: "Data post berhasil ditampilkan.",
        data: posts,
    });
});

router.get("/show/:id", async (req, res, next) => {
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

router.post("/", upload.single("cover"), async (req, res, next) => {
    try {
        const { title, content, categoryIds } = req.body;
        const cover = req.file;
        const post = await insertDataPosts(title, content, cover, categoryIds);

        res.status(201).json({
            success: true,
            message: "Data post berhasil dibuat.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

router.patch("/", (req, res, next) => {
    next(
        Object.assign(new Error("post id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

router.patch("/:id", upload.single("cover"), async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, content, categoryIds } = req.body;
        const cover = req.file;
        const post = await updateDataPosts(
            title,
            content,
            cover,
            postId,
            categoryIds,
        );

        res.status(200).json({
            success: true,
            message: "Data berhasil diubah.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/", (req, res, next) => {
    next(
        Object.assign(new Error("post id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

router.delete("/:id", async (req, res, next) => {
    try {
        const post = await deleteDataPosts(req.params.id);

        res.status(200).json({
            success: true,
            message: "Data berhasil dihapus.",
            data: post,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
