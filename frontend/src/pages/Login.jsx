import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import farmerHero from "../assets/farmer.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("login"));
        navigate("/home");
      } else {
        setIsError(true);
        setMessage(data.detail || "Login failed!");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <div className="flex flex-col md:flex-row bg-gradient-to-tr from-gray-900/80 via-gray-800/70 to-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={farmerHero}
            alt="Farmer"
            className="object-cover w-full h-full rounded-l-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="p-10 md:w-1/2 text-white flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-cyan-400">
            Welcome Farmers of India 🌱
          </h2>

          {message && (
            <p
              className={`mb-4 p-3 rounded text-center font-medium ${
                isError ? "bg-red-700 text-white" : "bg-green-600 text-white"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 via-teal-300 to-cyan-400 text-gray-900 py-3 rounded font-semibold hover:from-cyan-400 hover:to-green-400 transition transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-gray-300 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
