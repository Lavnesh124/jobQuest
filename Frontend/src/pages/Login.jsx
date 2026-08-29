import { useReducer, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const initialState = {
  email: "",
  password: "",
  companyName: "",
  companyPassword: "",
  error: "",
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, companyName, companyPassword, error } = state;

  const { setIsAuthenticated, setRole, role } = useAuth();
  const navigate = useNavigate();

  const isRecruiter = role === "recruiter";

  const apiUrl = useMemo(() => {
    return isRecruiter
      ? "http://localhost:8021/api/v1/user/loginRecruiters"
      : "http://localhost:8021/api/v1/user/loginStudents";
  }, [isRecruiter]);

  const handleChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ name: "error", value: "" });

    if (isRecruiter && (!companyName || !companyPassword)) {
      dispatch({
        name: "error",
        value: "Company name and password are required for recruiters",
      });
      return;
    }

    const loginData = isRecruiter
      ? {
          email,
          password,
          companyname: companyName,
          companypassword: companyPassword,
          role,
        }
      : { email, password, role };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        dispatch({
          name: "error",
          value: result.error || "Login failed. Please try again.",
        });
      } else {
        setIsAuthenticated(true);
        dispatch({ name: "error", value: "" });

        Object.keys(initialState).forEach((key) => {
          dispatch({ name: key, value: "" });
        });

        navigate(isRecruiter ? `/company/${result.user.companyId}` : "/");
      }
    } catch (err) {
      dispatch({
        name: "error",
        value: "An error occurred during login. Please try again.",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] bg-white flex">
      {/* Bridge panel */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#0F1D17] relative overflow-hidden flex-col justify-between p-12">
        <p className="text-white text-xl font-bold tracking-tight">WorkBridge</p>

        <div className="relative">
          <svg viewBox="0 0 400 200" className="w-full max-w-sm" fill="none">
            <path
              d="M 40 160 Q 200 20 360 160"
              stroke="#2E8B63"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            <circle cx="40" cy="160" r="7" fill="#F4C15C" />
            <circle cx="360" cy="160" r="7" fill="#F4C15C" />
            <circle cx="140" cy="63" r="3" fill="#4CA97E" />
            <circle cx="200" cy="42" r="3" fill="#4CA97E" />
            <circle cx="260" cy="63" r="3" fill="#4CA97E" />
          </svg>
          <div className="flex justify-between mt-3 px-1">
            <span className="text-white/70 text-xs uppercase tracking-widest">Talent</span>
            <span className="text-white/70 text-xs uppercase tracking-widest">Opportunity</span>
          </div>
        </div>

        <div>
          <h2 className="text-white text-3xl font-semibold leading-snug max-w-xs">
            Where the right people find the right roles.
          </h2>
          <p className="text-white/50 text-sm mt-4 max-w-xs">
            Log in to pick up where you left off.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <h1 className="text-3xl font-semibold text-[#14201B] mb-1">Welcome back</h1>
          <p className="text-[#14201B]/50 text-sm mb-8">Enter your details to continue.</p>

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
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />

          {isRecruiter && (
            <>
              <InputField
                label="Company name"
                name="companyName"
                value={companyName}
                onChange={handleChange}
              />
              <InputField
                label="Company password"
                type="password"
                name="companyPassword"
                value={companyPassword}
                onChange={handleChange}
              />
            </>
          )}

          {error && <p className="text-[#C0432A] text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#14201B] text-white font-medium py-3 rounded-lg hover:bg-[#1F6B4C] transition-colors mt-2"
          >
            Log in
          </button>

          <p className="text-center text-sm text-[#14201B]/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-[#1F6B4C] font-medium hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", name, value, onChange }) => (
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
      className="w-full px-0 py-2 border-0 border-b border-[#14201B]/15 bg-transparent text-[#14201B] focus:outline-none focus:border-[#1F6B4C] transition-colors"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default Login;