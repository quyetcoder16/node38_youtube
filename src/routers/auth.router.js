import express from "express";
import { login, loginFacebook, signUp } from "../controllers/auth.controllers.js";

const authRouters = express.Router();

authRouters.post("/login", login);
authRouters.post("/sign-up", signUp);
authRouters.post("/login-facebook", loginFacebook)

export default authRouters;