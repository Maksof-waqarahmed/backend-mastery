import { Request, Response } from "express";
import { z } from "zod";
import { userSignin, userSignup } from "../zod-schemas/user-schema";
import { comparePassword, generateToken, hashPassword, sendResponse } from "../lib/utils";
import { prisma } from "../lib/db";



export const userLogin = async (req: Request, res: Response) => {
    try {
        const parsed = userSignin.safeParse(req.body);
        if (!parsed.success) {
            return sendResponse(res, 400, "error", 'Invalid input data ' + z.treeifyError(parsed.error));
        }

        const { email, password: userPassword } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return sendResponse(res, 400, "error", 'User not found with this email');

        const isValidPassword = await comparePassword(userPassword, user.password!);
        if (!isValidPassword) return sendResponse(res, 400, "error", 'Invalid password');

        const safeUser = {
            id: user.id,
            name: user.name,
            number: user.number,
            role: user.isAdmin,
        };


        const token = generateToken(safeUser);
        if (!token) return sendResponse(res, 500, "error", 'Failed to generate token');

        // HTTP-only cookie set karna
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 15, 
        });

        return sendResponse(res, 200, "success", 'Login successful');

    } catch (error: any) {
        return sendResponse(res, 500, "error", 'Internal Server Error', error.message);
    }
}

export const userRegister = async (req: Request, res: Response) => {
    try {
        const isValidFields = userSignup.safeParse(req.body);

        if (!isValidFields.success) return sendResponse(res, 400, "error", 'Invalid input data ' + z.treeifyError(isValidFields.error));

        const { email, fullName, password, number } = isValidFields.data;

        console.log(email, fullName, password);

        const userAlreadyExists = await prisma.user.findFirst({ where: { email } });

        if (userAlreadyExists) return sendResponse(res, 400, "error", 'User already exists with this email');

        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) return sendResponse(res, 500, "error", 'Failed to hash password');


        await prisma.user.create({
            data: {
                email,
                name: fullName,
                password: hashedPassword,
                number
            }
        });

        return sendResponse(res, 201, "success", 'User created successfully');

    } catch (error: any) {
        sendResponse(res, 500, "error", 'Internal Server Error ' + error.message);
    }
}