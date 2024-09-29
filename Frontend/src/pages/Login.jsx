import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to "user"
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    const addUser = { email: email, password: password, role: role };
    console.log(addUser);
    const response = await fetch("http://localhost:8021/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
      console.log(result.error);
    } else {
      // Clear input fields and error message
      setRole("student");
      setError("");
      setPassword("");
      setEmail("");
      navigate("/"); // Navigate to home after successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Role</label>
          <div className="flex items-center justify-between">
            <span
              className={`cursor-pointer ${role === "recruiter" ? "font-bold" : "text-gray-600"
                }`}
              onClick={() => setRole("recruiter")}
            >
              Recruiter
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={role === "recruiter"}
                onChange={() => setRole(role === "recruiter" ? "student" : "recruiter")}
              />
              <div className="w-12 h-6 bg-[#00A263] rounded-full shadow-inner"></div>
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${role === "user" ? "translate-x-6" : "translate-x-0"
                  }`}
              ></div>
            </label>
            <span
              className={`cursor-pointer ${role === "student" ? "font-bold" : "text-gray-600"
                }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error} {/* Display error message */}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#00A263] text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Login
        </button>

        {/* Register Now Button */}
        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account?</p>
          <Link to="/register">
            <button className="text-[#00A263] font-bold">Register Now</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
