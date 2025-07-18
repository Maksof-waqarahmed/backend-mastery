const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image, Upload only images'));
    }
}

module.exports = multer({
    storage: multerStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})