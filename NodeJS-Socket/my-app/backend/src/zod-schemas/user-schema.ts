import z from "zod";

export const userSignup = z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    number: z.string()
});

export const userSignin = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
