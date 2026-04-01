import express from "express";
import {
    getDataCategories,
    insertDataCategories,
    updateDataCategories,
    deleteDataCategories,
} from "../controllers/categorycontroller.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
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

router.patch("/", (req, res, next) => {
    next(
        Object.assign(new Error("category id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

router.patch("/:id", async (req, res, next) => {
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

router.delete("/", async (req, res, next) => {
    next(
        Object.assign(new Error("category id pada url wajib diisi."), {
            status: 400,
        }),
    );
});

router.delete("/:id", async (req, res, next) => {
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

export default router;
