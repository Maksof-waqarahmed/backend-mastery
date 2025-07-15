require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("✅ Connected to MongoDB")
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        process.exit();
    }
}

module.exports = connectDB;