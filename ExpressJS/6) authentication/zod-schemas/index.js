const { z } = require("zod");

const userLoginSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string"
        })
        .email("Invalid email format"),

    userPassword: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string"
        })
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must include at least one uppercase letter"
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must include at least one number"
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must include at least one special character"
        })
});

const passwordUpdateSchema = z.object({
    oldPassword: z.string({
        required_error: "Old Password is required",
        invalid_type_error: "Password must be a string"
    }),
    newPassword: z
        .string({
            required_error: "New Password is required",
            invalid_type_error: "Password must be a string"
        })
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must include at least one uppercase letter"
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must include at least one number"
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must include at least one special character"
        })

})
module.exports = {
    userLoginSchema,
    passwordUpdateSchema
}