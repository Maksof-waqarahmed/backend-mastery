import { Request, Response } from "express";
import { userSignin, userSignup } from "../zod-schemas/user-schema";
import { comparePassword, hashPassword, sendResponse } from "../lib/utils";
import { prisma } from "../lib/db";



const userLogin = async (req: Request, res: Response) => {
    try {
        const isValidFields = userSignin.safeParse(req.body);

        if (!isValidFields.success) return sendResponse(res, 400, 'Invalid input data ' + isValidFields.error);

        const { email, password: userPassword } = isValidFields.data;

        const userAlreadyExists = await prisma.user.findFirst({
            where: { email }
        })

        if (!userAlreadyExists) return sendResponse(res, 400, 'User Not Found with this email');

        const isValidPassword = await comparePassword(userPassword, userAlreadyExists.password!);

        if (!isValidPassword) return sendResponse(res, 400, 'Invalid password');

        const user = await prisma.user.findFirst({
            where: { email }
        })

        const { password, ...payload } = user!;

        // Generate JWT token
        // const token = generateToken(payload);



        return sendResponse(res, 201, 'User login successfully', user);

    } catch (error: any) {
        sendResponse(res, 500, 'Internal Server Error ' + error.message);
    }
}

export const userRegister = async (req: Request, res: Response) => {
    try {
        const isValidFields = userSignup.safeParse(req.body);

        if (!isValidFields.success) return sendResponse(res, 400, 'Invalid input data ' + isValidFields.error);

        const { email, fullName, password } = isValidFields.data;

        const userAlreadyExists = await prisma.user.findFirst({
            where: { email }
        })

        if (userAlreadyExists) return sendResponse(res, 400, 'User already exists with this email');

        const hashedPassword = hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                name: fullName,
                password: hashedPassword
            }
        });

        return sendResponse(res, 201, 'User created successfully', user);

    } catch (error: any) {
        sendResponse(res, 500, 'Internal Server Error ' + error.message);
    }
}