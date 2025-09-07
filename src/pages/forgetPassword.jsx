import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ForgetPasswordPage() {
    const [otpSent, setOtpSent] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    function sendOtp() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", { email })
            .then(() => {
                setOtpSent(true)
                toast.success("OTP sent! Check your inbox.")
            })
            .catch(() => toast.error("Failed to send OTP"))
    }

    function verifyOtp() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
            email,
            otp: parseInt(otp, 10),
            newPassword,
        })
            .then(() => {
                toast.success("Password reset successfully!")
                navigate("/login")
            })
            .catch(() => toast.error("Invalid OTP"))
    }

    return (
        <div className="w-full min-h-screen bg-[url('/background.jpeg')] bg-center bg-cover flex justify-evenly items-center">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    {otpSent ? "Reset Password" : "Forgot Password"}
                </h2>

                {!otpSent ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 mb-6 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
                        >
                            Send OTP
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-4 text-blue-600 hover:underline font-medium"
                        >
                            Back to Login
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-4 mb-6 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition"
                        />
                        <button
                            onClick={verifyOtp}
                            className="w-full py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition"
                        >
                            Verify OTP & Reset
                        </button>
                        <button
                            onClick={() => setOtpSent(false)}
                            className="mt-4 w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition"
                        >
                            Resend OTP
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
