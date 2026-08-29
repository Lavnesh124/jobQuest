import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
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
  const { isAuthenticated, loading, setIsAuthenticated } = useAuth();

  const isRecruiter = role === "recruiter";

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
        setRole("student");
        setError("");
        setPassword("");
        setEmail("");
        setFullName("");
        setPhoneNumber("");
        setCompanyName("");
        setCompanyPassword("");
        navigate("/");
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] bg-white flex">
      {/* Side panel */}
      <div className="hidden lg:flex lg:w-[38%] bg-[#0F1D17] flex-col justify-between p-12">
        <p className="text-white text-xl font-bold tracking-tight">WorkBridge</p>

        <div>
          <p className="text-[#F4C15C] text-xs uppercase tracking-widest font-medium mb-4">
            {isRecruiter ? "For recruiters" : "For students"}
          </p>
          <h2 className="text-white text-3xl font-semibold leading-snug max-w-xs">
            Where the right people find the right roles.
          </h2>
          <p className="text-white/50 text-sm mt-4 max-w-xs">
            Create an account to get started.
          </p>
        </div>

        <p className="text-white/30 text-xs">© 2026 WorkBridge</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <form onSubmit={handleRegister} className="w-full max-w-sm">
          <h1 className="text-3xl font-semibold text-[#14201B] mb-1">Create account</h1>
          <p className="text-[#14201B]/50 text-sm mb-8">Enter your details to get started.</p>

          {/* Role segmented control */}
          <div className="flex gap-6 mb-8 border-b border-[#14201B]/10">
            {["recruiter", "student"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`relative pb-3 text-sm font-medium capitalize transition-colors ${
                  role === r ? "text-[#14201B]" : "text-[#14201B]/40 hover:text-[#14201B]/70"
                }`}
              >
                {r}
                {role === r && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#1F6B4C] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <InputField
            label="Full name"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Phone number"
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]+"
          />

          {isRecruiter && (
            <>
              <InputField
                label="Company name"
                name="companyname"
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <InputField
                label="Company password"
                type="password"
                name="companypassword"
                value={companypassword}
                onChange={(e) => setCompanyPassword(e.target.value)}
              />
            </>
          )}

          {error && <p className="text-[#C0432A] text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#14201B] text-white font-medium py-3 rounded-lg hover:bg-[#1F6B4C] transition-colors mt-2"
          >
            Register
          </button>

          <p className="text-center text-sm text-[#14201B]/50 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1F6B4C] font-medium hover:underline">
              Log in now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", name, value, onChange, pattern }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-[#14201B]/70 mb-1.5" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      pattern={pattern}
      className="w-full px-0 py-2 border-0 border-b border-[#14201B]/15 bg-transparent text-[#14201B] focus:outline-none focus:border-[#1F6B4C] transition-colors"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default Register;