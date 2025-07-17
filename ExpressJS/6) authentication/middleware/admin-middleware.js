const { sendResponse } = require('../helper/index');

const adminRouteMiddleware = (req, res, next) => {
    try {
        if (req.user?.role !== "ADMIN") {
            return sendResponse(false, "Access denied. Admins only.", null, 403, res);
        }

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return sendResponse(false, err.message, null, 401, res);
    }
}

module.exports = adminRouteMiddleware;