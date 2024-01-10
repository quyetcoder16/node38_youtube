// upload images 

import multer, { diskStorage } from "multer";

const storage = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (req, file, callback) => {
            callback(null, new Date().getTime() + `_${file.originalname}`);
        }
    })
})

export default storage;