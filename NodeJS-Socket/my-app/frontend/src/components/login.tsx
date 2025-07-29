// File: components/AuthForm.tsx

import { useState } from "react";
interface UserData {
    email: string;
    password?: string;
    fullName?: string;
}
export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    const [userData, setUserData] = useState<UserData>({
        email: "",
        password: "",
        fullName: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));

        console.log(`Key: ${name}, Value: ${value}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101828] px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-[#101828]">
                    {isLogin ? "Login to Your Account" : "Create an Account"}
                </h2>

                <form className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#101828]"
                            onChange={handleInputChange}
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#101828]"
                        onChange={handleInputChange}
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#101828]"
                        onChange={handleInputChange}
                    />


                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#101828] text-white rounded-md hover:bg-black transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 text-[#101828] hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
