import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) fetchUsers();
  }, [isLoading]);

  const toggleBlock = async (userId, isBlocked) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${userId}`,
        { isBlocked: !isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully`);
      setIsLoading(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User deleted successfully");
      setIsLoading(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="relative w-full h-full p-6 font-[var(--font-main)] bg-gray-50">
      {/* Loader */}
      {isLoading ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-[var(--color-accent)] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-[var(--color-accent)] text-white text-base">
              <tr>
                <th className="py-4 px-3 text-left">Profile</th>
                <th className="py-4 px-3 text-left">Name</th>
                <th className="py-4 px-3 text-left">Email</th>
                <th className="py-4 px-3 text-left">Role</th>
                <th className="py-4 px-3 text-left">Status</th>
                <th className="py-4 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-3 flex justify-center">
                    <img
                      src={user.img || "/placeholder.png"}
                      alt="Profile"
                      className="w-12 h-12 object-cover rounded-full shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-3">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-3">{user.email}</td>
                  <td className="py-3 px-3">{user.role}</td>
                  <td className="py-3 px-3">{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td className="py-3 px-3 flex justify-center gap-3">
                    <button
                      onClick={() => toggleBlock(user._id, user.isBlocked)}
                      className={`w-20 px-3 py-1 rounded text-white ${
                        user.isBlocked
                          ? "bg-green-500 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-700"
                      } transition`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Add Admin Button */}
      <Link
        to="/admin/add-admin"
        className="fixed bottom-6 right-6 bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
      >
        + Add Admin Account
      </Link>
    </div>
  );
}
