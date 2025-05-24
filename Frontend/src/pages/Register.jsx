import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [companypassword, setCompanyPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      let registerData = {};
      let apiUrl = "";

      if (role === "recruiter") {
        registerData = {
          fullname,
          email,
          password,
          phoneNumber,
          role,
          companyname,
          companypassword,
        };
        apiUrl = "http://localhost:8021/api/v1/user/registerRecruiters";
      } else {
        registerData = {
          fullname,
          email,
          password,
          phoneNumber,
          role,
        };
        apiUrl = "http://localhost:8021/api/v1/user/registerStudents";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
        setFullName("");
        setPhoneNumber("");
        setCompanyName("");
        setCompanyPassword("");
        navigate("/"); // Navigate to home after successful registration
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error(error);
    }
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
            pattern="[0-9]+"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your phone number"
          />
        </div>

        {role === "recruiter" && (
          <>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="companyname"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyname"
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
                placeholder="Enter company name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="companypassword"
              >
                Company Password
              </label>
              <input
                type="password"
                id="companypassword"
                value={companypassword}
                onChange={(e) => setCompanyPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
                placeholder="Enter company password"
              />
            </div>
          </>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Role</label>
          <div className="flex items-center justify-between">
            <span
              className={`cursor-pointer ${
                role === "recruiter" ? "font-bold" : "text-gray-600"
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
                onChange={() =>
                  setRole(role === "recruiter" ? "student" : "recruiter")
                }
              />
              <div className="w-12 h-6 bg-[#00A263] rounded-full shadow-inner"></div>
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                  role === "student" ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </label>
            <span
              className={`cursor-pointer ${
                role === "student" ? "font-bold" : "text-gray-600"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
