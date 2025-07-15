const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    tags: [String],
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now }
})

const UserModel = mongoose.model("User", userSchema)

async function createUser() {
    try {
        // const newUser = await UserModel.create({
        //     age: 12,
        //     email: 'ahad7861234@gmail.com',
        //     isActive: false,
        //     name: "Ahad",
        //     tags: ['developer', 'devOps', 'engineer', 'teacher']
        // })

        // console.log("New User", newUser)

        // const newUser = new UserModel({
        //     age: 12,
        //     email: 'ahmed7861234@gmail.com',
        //     isActive: true,
        //     name: "Ahmed",
        //     tags: ['developer', 'devOps', 'engineer', 'teacher']
        // })

        // await newUser.save()

        // const allUsers = await UserModel.find({});
        // console.log(allUsers)

        // const inActiveUser = await UserModel.find({ isActive: false })
        // console.log("inActiveUser", inActiveUser)

        // const selectedField = await UserModel.find().select('name email -_id');
        // console.log("SelectedField", selectedField);

        // const limitedUser = await UserModel.find().limit(4).skip(1);
        // console.log("limitedUser", limitedUser)

        // const sortedUsers = await UserModel.find().sort({ age: -1 });
        // console.log("sortedUsers", sortedUsers)

        // const countDocuments = await UserModel.countDocuments({ isActive: false })
        // const countDocuments = await UserModel.countDocuments()
        // console.log("countDocuments", countDocuments);

        // const deletedUser = await UserModel.findByIdAndDelete('6875fce572cc18354201346c')
        // console.log("deletedUser", deletedUser)

        // const updatedUser = await UserModel.findByIdAndUpdate('6875f04a8bc59264e5a92f5c', {
        //     $set: { age: 100 }, $push: { tags: 'updated' }
        // }, { new: true });

        // console.log("updatedUser", updatedUser)

    } catch (error) {
        console.log("Error", error)
    } finally {
        await mongoose.connection.close()
    }
}
createUser()
