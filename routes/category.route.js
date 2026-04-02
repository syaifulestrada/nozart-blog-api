import express from "express";
import {
    index,
    store,
    update,
    destroy,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const category = await index();

        res.status(200).json({
            success: true,
            message:
                category.length === 0
                    ? "Data category beluma ada."
                    : "Data category berhasil ditampilkan.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const category = await store(req.body.name);

        res.status(201).json({
            success: true,
            message: "Data category berhasil dibuat.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

router.patch("/", (req, res, next) => {
    next(
        Object.assign(new Error("category id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

router.patch("/:id", async (req, res, next) => {
    try {
        const category = await update(req.body.name, req.params.id);

        res.status(201).json({
            success: true,
            message: "Data category berhasil diubah.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/", async (req, res, next) => {
    next(
        Object.assign(new Error("category id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

router.delete("/:id", async (req, res, next) => {
    try {
        const category = await destroy(req.params.id);

        res.status(201).json({
            success: true,
            message: "Data category berhasil dihapus.",
            data: category,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
