const { verifyToken, sendResponse } = require('../helper/index');

// ───────────────────────────────────────────────────────────────
// @desc    Middleware to protect routes using JWT authentication
// @usage   Add to protected routes to validate user token
// ───────────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
    try {
        // Extract token from Authorization header: "Bearer <token>"
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendResponse(false, "Authorization token not provided", "", 401, res);
        }

        const token = authHeader.split(" ")[1];

        // Validate token
        const decoded = verifyToken(token);
        if (!decoded) {
            return sendResponse(false, "Invalid or expired token", "", 401, res);
        }

        // Attach decoded user to request object for downstream use
        req.user = decoded;

        // Move to next middleware or route handler
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return sendResponse(false, "Authentication failed due to server error", "", 500, res);
    }
};

module.exports = {
    authMiddleware
};
