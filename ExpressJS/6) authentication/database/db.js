require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error", error)
        process.exit()
    }
}

module.exports = connectDB;
