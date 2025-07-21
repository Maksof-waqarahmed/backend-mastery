const { sendResponse, verifyToken } = require('../helper/index');


// ───────────────────────────────────────────────────────────────
// @desc    Middleware to protect routes using JWT authentication
// @usage   Add to protected routes to validate user token
// ───────────────────────────────────────────────────────────────

const authMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return sendResponse(false, "Authorization header missing", null, 401, res);
        }

        const [scheme, token] = authorizationHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return sendResponse(false, "Invalid authorization format", null, 401, res);
        }

        let decodedToken;
        try {
            decodedToken = verifyToken(token);
        } catch (jwtError) {
            return sendResponse(false, "Invalid or expired token", null, 401, res);
        }

        req.user = decodedToken; // Attach user payload to request for downstream use
        next();
    } catch (error) {
        console.error("[AuthMiddleware] Unexpected Error:", error);
        return sendResponse(false, "Authentication failed", null, 500, res);
    }
};

module.exports = authMiddleware;
