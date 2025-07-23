const sendResponse = (success, message, data, status, res) => {
    res.status(status).json({
        success: success,
        message: message,
        data
    })
}

module.exports = {
    sendResponse
}