import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { GrGoogle } from "react-icons/gr"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const googleLogin  = useGoogleLogin({
        onSuccess: (response) => {
            const accessToken = response.access_token
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", { accessToken })
                .then((response) => {
                    toast.success("Login Successful")
                    localStorage.setItem("token", response.data.token)
                    navigate(response.data.role === "admin" ? "/admin/" : "/")
                })
                .catch(() => toast.error("Google login failed"))
        }
    })

    async function handleLogin() {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", { email, password })
            toast.success("Login Successful")
            localStorage.setItem("token", response.data.token)
            navigate(response.data.role === "admin" ? "/admin/" : "/")
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/background.jpeg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome Back</h2>

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 mb-6 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                />

                <button 
                    onClick={handleLogin} 
                    className="w-full py-4 mb-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
                >
                    Login
                </button>

                <button 
                    onClick={googleLogin} 
                    className="w-full py-4 mb-4 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                >
                    <GrGoogle className="mr-2 text-xl text-red-500" />
                    <span className="font-semibold text-gray-700">Login with Google</span>
                </button>

                <div className="w-full flex justify-between mt-4">
                    <button 
                        onClick={() => navigate("/signup")} 
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Create an Account
                    </button>

                    <button 
                        onClick={() => navigate("/forget")} 
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Continue as Guest */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    )
}
