const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            publicID: result.public_id
        }
    } catch (error) {
        console.log("Error while uploading image", error);
        throw new Error("Error Wile uplaoding Iamge")
    }
}

module.exports = {
    uploadToCloudinary
}