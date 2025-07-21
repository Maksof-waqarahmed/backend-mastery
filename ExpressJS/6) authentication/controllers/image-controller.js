const { sendResponse } = require('../helper/index');
const { uploadToCloudinary } = require('../helper/cloudinary-helper');
const cloudinary = require('../config/cloudinary')
const Image = require('../models/image');
const fs = require("fs");

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

        //delete the file from local stroage
        // fs.unlinkSync(req.file.path);

        sendResponse(true, "Image uploaded succesfully", newlyUploadedImage, 201, res)

    } catch (error) {
        console.log("Error", error);
        sendResponse(false, "Could  not upload image " + error.message, null, 500, res)
    }
}

const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const userID = req.user._id;
        // Check if ID is provided
        if (!imageId) {
            return sendResponse(false, "Image ID is required", null, 400, res);
        }

        // Fetch image from DB
        const image = await Image.findById(imageId);

        if (!image) {
            return sendResponse(false, "Image not found", null, 404, res);
        }

        if (image.uploadedBy.toString() !== userID) {
            return sendResponse(false, "You are not authenticate", null, 404, res);
        }

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(image.publicID);

        // Delete image record from DB
        await Image.findByIdAndDelete(imageId);

        return sendResponse(true, "Image deleted successfully", null, 200, res);

    } catch (error) {
        console.error("[deleteImage] Error:", error);
        return sendResponse(false, `Could not delete image: ${error.message}`, null, 500, res);
    }
};

const fetchAllImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sort || "createdAt";
        const sortOrder = req.query.order === "asc" ? 1 : -1;

        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const images = await Image.find()
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit);

        return sendResponse(true, "Images fetched successfully", {
            currentPage: page,
            totalPages,
            totalImages,
            images,
        }, 200, res);

    } catch (error) {
        console.error("[fetchAllImages] Error:", error);
        return sendResponse(false, `Failed to fetch images: ${error.message}`, null, 500, res);
    }
};

module.exports = {
    uplaodImage,
    deleteImage,
    fetchAllImages
}