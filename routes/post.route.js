import express from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import {
    index,
    show,
    store,
    update,
    destroy,
} from "../controllers/post.controller.js";

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
    const posts = await index();

    res.status(200).json({
        success: true,
        message:
            posts.length === 0
                ? "Data post belum ada."
                : "Data post berhasil ditampilkan.",
        data: posts,
    });
});

router.get("/show/:id", async (req, res, next) => {
    try {
        const post = await show(req.params.id);

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
        const post = await store({ ...req.body, cover: req.file });

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
        const post = await update({
            ...req.body,
            postId: req.params.id,
            cover: req.file,
        });

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
        const post = await destroy(req.params.id);

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
