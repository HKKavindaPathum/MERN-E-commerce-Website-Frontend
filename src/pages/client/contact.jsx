import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon 😊");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full bg-pink-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Have questions or feedback? We’d love to hear from you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-pink-600 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label className="block text-pink-600 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label className="block text-pink-600 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 shadow-md"
          >
            Send Message
          </button>
          <div className="mt-10 text-center text-gray-600">
            <p>Email: <span className="text-pink-600 font-semibold">support@ourstore.com</span></p>
            <p>Phone: <span className="text-pink-600 font-semibold">+94 77 123 4567</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}
