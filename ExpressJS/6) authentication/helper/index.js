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

const checkToken = async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new Error("Authorization header not found");

    const token = authHeader.split(" ")[1]; // Format: Bearer <token>
    if (!token) throw new Error("Token not provided");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
}

module.exports = {
    sendResponse,
    isValidId,
    hashPassword,
    comparePassword,
    createToken,
    verifyToken,
    checkToken
}