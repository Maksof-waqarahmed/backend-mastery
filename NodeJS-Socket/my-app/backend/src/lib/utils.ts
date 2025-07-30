import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import { Response } from 'express';

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET not defined");

export const sendResponse = (
    res: Response,
    statusCode: number,
    status: 'success' | 'error' = 'success',
    message: string,
    data?: any
) => {
    res.status(statusCode).json({
        status,
        message,
        data: data || null,
    });
};

export const hashPassword = async (password: string) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt);
};


export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bycrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: any) => {
    return jwt.sign(payload, secret, { expiresIn: "15m" })
}