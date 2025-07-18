const { sendResponse } = require('../helper/index');
const { uploadToCloudinary } = require('../helper/cloudinary-helper');
const Image = require('../models/image');

const uplaodImage = async (req, res) => {
    try {

        if (!req.file) sendResponse(!!req.file, "File is required", null, 400, res);

        const { url, publicID } = await uploadToCloudinary(req.file.path);

        const newlyUploadedImage = new Image({
            url,
            publicID,
            uploadedBy: req.user._id
        })

        await newlyUploadedImage.save()

        sendResponse(true, "Image uploaded succesfully", newlyUploadedImage, 201, res)

    } catch (error) {
        console.log("Error", error);
        sendResponse(false, "Could  not upload image " + error.message, null, 500, res)
    }
}

module.exports = {
    uplaodImage
}