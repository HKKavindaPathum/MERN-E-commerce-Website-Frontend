import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login as admin first");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/admin",
        {
          firstName,
          lastName,
          email,
          password,
          role: "admin",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Admin account created successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create admin account");
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-6 font-[var(--font-main)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4 border"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--color-accent)]">
          Create Admin Account
        </h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          required
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-bold py-2 px-4 rounded transition"
          >
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
}
