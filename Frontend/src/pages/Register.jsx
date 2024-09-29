import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user"); // Default to "user"

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., API call)
    console.log({ fullname, email, password, phoneNumber, role });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100 p-10">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="fullname"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your full name"
          />
        </div>

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

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Role</label>
          <div className="flex items-center justify-between">
            <span
              className={`cursor-pointer ${
                role === "admin" ? "font-bold" : "text-gray-600"
              }`}
              onClick={() => setRole("admin")}
            >
              Admin
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={role === "admin"}
                onChange={() => setRole(role === "admin" ? "user" : "admin")}
              />
              <div className="w-12 h-6 bg-[#00A263] rounded-full shadow-inner"></div>
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                  role === "user" ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </label>
            <span
              className={`cursor-pointer ${
                role === "user" ? "font-bold" : "text-gray-600"
              }`}
              onClick={() => setRole("user")}
            >
              User
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00A263] text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">Already have an account?</p>
          <Link to="/login">
            <button className="text-[#00A263] font-bold">Login Now</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
