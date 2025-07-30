import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { fetcher } from "../../lib/fetcher";
interface UserData {
    email: string | null;
    password?: string | null;
}
export default function LoginAuthForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        email: null,
        password: null,
    })

    const navigator = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            setError("Email and Password are required.");
            return;
        }
        const response = await fetcher('api/auth/login', { method: "POST", body: userData });

        if (response.status == "error") {
            setError(response.message);
        }

        if (response.status == "success") {
            console.log("Response", response)
            setError(null);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigator('/dashboard');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101828] px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-[#101828]">
                    "Login to Your Account"
                </h2>
                <p className="text-red-500 font-bold text-center">{error && error}</p>
                <form className="space-y-4" onSubmit={submit}>

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
                        disabled={loading}
                    >
                        {loading ? "Login..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Don't have an account?
                    <button
                        type="button"
                        className="ml-1 text-[#101828] hover:underline"
                        onClick={() => navigator('/register')}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}
