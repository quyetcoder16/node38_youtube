import express from "express";
import videoRoutes from "./video.router.js";
import userRouters from "./user.router.js";
import authRouters from "./auth.router.js";

const rootRouter = express.Router();

rootRouter.use("/video", videoRoutes);
rootRouter.use("/user", userRouters);
rootRouter.use("/auth", authRouters);

export default rootRouter;