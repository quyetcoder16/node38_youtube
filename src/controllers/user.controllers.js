const uploadSingleAvatar = (req, res) => {
    res.send(req.file);
}

export {
    uploadSingleAvatar,

}