import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";

const app = express();

const PORT = 8081;

app.use(express.json());
app.use(express.static("."));
app.use(cors({
    origin: "*",
}));
app.use(rootRouter);

app.get("/", (req, res) => {
    res.send("test");
});

app.listen(PORT, () => {
    console.log("server is running on port : ", PORT);
})