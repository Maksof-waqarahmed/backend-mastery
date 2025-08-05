import { Request, Response } from "express";
import { prisma } from "../lib/db";
import { sendResponse, verifyToken } from "../lib/utils";

export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                number: true,
                isAdmin: true
            }
        });

        return sendResponse(res, 200, "success", 'Users fetched successfully', { users });

    } catch (error: any) {
        return sendResponse(res, 500, "error", 'Internal Server Error ' + error.message);
    }
}


export const getCurrentUser = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) return sendResponse(res, 401, "error", 'Unauthorized access');

    try {
        const decode = verifyToken(token);
        if (!decode) return sendResponse(res, 401, "error", 'Token verification failed');

        return sendResponse(res, 200, "success", 'User fetched successfully', { user: decode });

    } catch (error: any) {
        sendResponse(res, 500, "error", 'Internal Server Error ' + error.message);
    }
}