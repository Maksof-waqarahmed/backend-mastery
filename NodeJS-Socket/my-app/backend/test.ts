import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (payload: any) => {
    console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
    // return jwt.sign(payload, process.env.JWT_SECRET ?? "32423", { expiresIn: "15m" })
}

generateToken({ id: 1, name: "John Doe" });