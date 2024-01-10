import express from 'express';
import { createVideo, deleteVideo, getVideo } from '../controllers/video.controllers.js';
import { khoaApi } from '../configs/jwt.config.js';


const videoRoutes = express.Router();

videoRoutes.get("/get-video/:page/:size",khoaApi, getVideo); // define API get-video có method là GET

videoRoutes.post("/create-video", createVideo);
videoRoutes.delete("/delete-video/:id", deleteVideo);


export default videoRoutes;