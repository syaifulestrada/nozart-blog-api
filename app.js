import express, { json } from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import categoryRoute from "./routes/category.route.js";

const app = express();
const port = 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);

app.use(json());
app.use(express.static("storage"));

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

app.use("/api/posts", postRoute);
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
