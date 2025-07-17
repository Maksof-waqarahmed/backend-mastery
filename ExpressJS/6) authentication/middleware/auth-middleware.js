const { verifyToken, sendResponse, checkToken } = require('../helper/index');

// ───────────────────────────────────────────────────────────────
// @desc    Middleware to protect routes using JWT authentication
// @usage   Add to protected routes to validate user token
// ───────────────────────────────────────────────────────────────


const authMiddleware = async (req, res, next) => {
    try {
        await checkToken(req)

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return sendResponse(false, err.message, null, 401, res);
    }
};

const adminRouteMiddleware = async (req, res, next) => {
    try {
        await checkToken(req)

        if (req.user?.role !== "ADMIN") {
            return sendResponse(false, "Access denied. Admins only.", null, 403, res);
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return sendResponse(false, err.message, null, 401, res);
    }
}

module.exports = {
    authMiddleware,
    adminRouteMiddleware
};
