import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await axios.post(`${API}/register`, { username, email, password });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("✅ Registered successfully!");
      setTimeout(() => navigate("/home", { replace: true }), 2000);
    } catch (err) {
      setIsError(true);
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 p-4">
      <h1 className="text-3xl font-extrabold text-green-700 mb-2">
        🌾 Welcome Farmers of India 
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Join our platform to connect, grow, and harvest opportunities together.
      </p>

      {message && (
        <p
          className={`mb-4 p-2 rounded w-80 text-center ${
            isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleRegister} className="bg-white p-6 rounded-2xl shadow-lg w-80 border border-green-200">
        <input
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          🌱 Register
        </button>
      </form>

      <p className="mt-4 text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-green-700 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
