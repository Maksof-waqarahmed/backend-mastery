import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';

export const sendResponse = (res: any, statusCode: number, message: string, data?: any) => {
    res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data || null
    });
}

// export const generateToken = (payload: any) => {
//     jwt.sign({
//         payload,

//     })
// }

export const hashPassword = (password: string) => {
    return bycrypt.hashSync(password, 10);
}

export const comparePassword = (password: string, hashedPassword: string) => {
    return bycrypt.compare(password, hashedPassword);
}

// const generateToken = (payload: any) => {
//     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
// }