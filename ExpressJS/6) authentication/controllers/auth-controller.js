const { sendResponse, comparePassword, hashPassword, createToken } = require('../helper/index');
const User = require('../models/user');
const { userLoginSchema } = require('../zod-schemas/index');

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
      return sendResponse(false, "Invalid email or password", "", 401, res);
    }

    // Compare hashed password
    const isMatch = await comparePassword(user.password, userPassword);
    if (!isMatch) {
      return sendResponse(false, "Invalid email or password", "", 401, res);
    }

    // Create payload excluding sensitive info
    const { password, __v, ...payload } = user.toObject();
    const token = createToken(payload);

    return sendResponse(true, "Login successful", { token }, 200, res);
  } catch (error) {
    console.error("User Login Error:", error);
    return sendResponse(false, "Server error during login", "", 500, res);
  }
};

module.exports = {
  userRegister,
  userLogin
};
