const mongoose = require('mongoose');

const sendResponse = (success, message, data, status, res) => {
    res.status(status).json({
        success: success,
        message: message,
        data
    })
}

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
    sendResponse,
    isValidId
}