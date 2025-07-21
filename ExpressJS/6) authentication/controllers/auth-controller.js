const { sendResponse, comparePassword, hashPassword, createToken } = require('../helper/index');
const User = require('../models/user');
const { userLoginSchema, passwordUpdateSchema } = require('../zod-schemas/index');

// ───────────────────────────────────────────────────────────────
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// ───────────────────────────────────────────────────────────────
const userRegister = async (req, res) => {
  try {
    const { userName, email, userPassword } = req.body;

    // Basic field check
    if (!userName || !email || !userPassword) {
      return sendResponse(false, "All fields are required", "", 400, res);
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(false, "Email already in use", "", 409, res);
    }

    // Hash password
    const hashedPassword = await hashPassword(userPassword, 10);

    // Create user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword
    });

    // Remove sensitive fields from response
    const { password, _id, __v, ...sanitizedUser } = newUser.toObject();

    return sendResponse(true, "User registered successfully", sanitizedUser, 201, res);
  } catch (error) {
    console.error("User Registration Error:", error);
    return sendResponse(false, "Server error during registration", "", 500, res);
  }
};

// ───────────────────────────────────────────────────────────────
// @desc    Login existing user
// @route   POST /api/auth/login
// @access  Public
// ───────────────────────────────────────────────────────────────
const userLogin = async (req, res) => {
  try {
    // Validate request body with Zod
    const parsed = userLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendResponse(false, "Invalid input format", parsed.error.format(), 400, res);
    }

    const { email, userPassword } = parsed.data;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(false, "Invalid email or password", null, 401, res);
    }

    // Compare hashed password
    const isMatch = await comparePassword(user.password, userPassword);
    if (!isMatch) {
      return sendResponse(false, "Invalid email or password", null, 401, res);
    }

    // Create payload excluding sensitive info
    const { password, __v, ...payload } = user.toObject();
    const token = createToken(payload);

    return sendResponse(true, "Login successful", { token }, 200, res);
  } catch (error) {
    console.error("User Login Error:", error);
    return sendResponse(false, "Server error during login", null, 500, res);
  }
};

const changePassword = async (req, res) => {
  try {
    // Validate request body using Zod schema
    const parsed = passwordUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendResponse(false, "Invalid input format", parsed.error.format(), 400, res);
    }

    const userID = req.user._id;

    // Fetch user by ID
    const user = await User.findById(userID);
    if (!user) {
      return sendResponse(false, "User not found", null, 404, res);
    }

    const { oldPassword, newPassword } = parsed.data;

    // Verify old password
    const isMatch = await comparePassword(user.password, oldPassword);
    if (!isMatch) {
      return sendResponse(false, "Old password is incorrect", null, 401, res);
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword, 10);

    // Update password and save user
    user.password = hashedPassword;
    await user.save();

    return sendResponse(true, "Password updated successfully", null, 200, res);

  } catch (error) {
    console.error("Error updating password:", error);
    return sendResponse(false, "Internal server error", null, 500, res);
  }
};


module.exports = {
  userRegister,
  userLogin,
  changePassword
};