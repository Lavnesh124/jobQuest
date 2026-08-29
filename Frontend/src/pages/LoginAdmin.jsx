import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const { isAuthenticated, loading, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

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
      setIsAuthenticated(true);
      setRole("admin");
      setError("");
      setPassword("");
      setEmail("");
      navigate("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] bg-white flex">
      {/* Side panel */}
      <div className="hidden lg:flex lg:w-[38%] bg-[#0F1D17] flex-col justify-between p-12">
        <p className="text-white text-xl font-bold tracking-tight">WorkBridge</p>

        <div>
          <span className="inline-flex items-center gap-2 text-[#F4C15C] text-xs uppercase tracking-widest font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            Restricted access
          </span>
          <h2 className="text-white text-3xl font-semibold leading-snug max-w-xs">
            Admin console for the WorkBridge platform.
          </h2>
          <p className="text-white/50 text-sm mt-4 max-w-xs">
            This area is for authorized administrators only.
          </p>
        </div>

        <p className="text-white/30 text-xs">© 2026 WorkBridge</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="text-3xl font-semibold text-[#14201B] mb-1">Admin login</h1>
          <p className="text-[#14201B]/50 text-sm mb-8">
            Sign in with your administrator credentials.
          </p>

          <div className="mb-5">
            <label className="block text-sm font-medium text-[#14201B]/70 mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-0 py-2 border-0 border-b border-[#14201B]/15 bg-transparent text-[#14201B] focus:outline-none focus:border-[#1F6B4C] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-[#14201B]/70 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-0 py-2 border-0 border-b border-[#14201B]/15 bg-transparent text-[#14201B] focus:outline-none focus:border-[#1F6B4C] transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-[#C0432A] text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#14201B] text-white font-medium py-3 rounded-lg hover:bg-[#1F6B4C] transition-colors mt-2"
          >
            Log in
          </button>

          <p className="text-center text-sm text-[#14201B]/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/registerAdmin" className="text-[#1F6B4C] font-medium hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;