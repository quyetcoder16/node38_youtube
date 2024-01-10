import express from "express";
import storage from "../controllers/upload.controllers.js";
import { uploadSingleAvatar } from "../controllers/user.controllers.js";
import { khoaApi } from "../configs/jwt.config.js";
import uploadCloud from "../configs/cloudinary.config.js";

const userRouters = express.Router();


// process.cwd()

// const storage = multer.diskStorage({
//     destination: process.cwd() + "/public/img", // define path 
//     filename: (req, res, callback) => {
//         callback(null, new Date().getTime() + `_${file.filename}`)
//     }

// });

// const upload = multer({storage});



userRouters.post("/upload-avatar", khoaApi, uploadCloud.single("file"), uploadSingleAvatar);

userRouters.post("/upload-multiple-avatar", storage.array("files"), (req, res) => {
    res.send(req.files);
});


export default userRouters;