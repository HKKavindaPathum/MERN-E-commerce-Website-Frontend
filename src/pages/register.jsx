import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister() {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                firstName,
                lastName,
                email,
                password
            })
            toast.success("Registration Successful")
            navigate("/login")
        } catch (e) {
            toast.error(e.response?.data?.message || "Registration Failed")
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/background.jpeg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Create an Account</h2>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                />
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
                    onClick={handleRegister}
                    className="w-full py-4 mb-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
                >
                    Register
                </button>

                <div className="w-full flex justify-between mt-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Already have an account? Login
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
