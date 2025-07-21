require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sendResponse = (success, message, data, status, res) => {
    res.status(status).json({
        success: success,
        message: message,
        data
    })
}

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const hashPassword = async (password, round) => {
    const salt = await bcrypt.genSalt(round)
    return await bcrypt.hash(password, salt);
}
const comparePassword = async (hashPassword, originalPassword) => {
    return await bcrypt.compare(originalPassword, hashPassword);
}

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    sendResponse,
    isValidId,
    hashPassword,
    comparePassword,
    createToken,
    verifyToken
}