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
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
              label="Company Name"
              name="companyName"
              value={companyName}
              onChange={handleChange}
            />
            <InputField
              label="Company Password"
              type="password"
              name="companyPassword"
              value={companyPassword}
              onChange={handleChange}
            />
          </>
        )}

        <RoleToggle role={role} setRole={setRole} />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#00A263] text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">Don&apos;t have an account?</p>
          <Link to="/register" className="text-[#00A263] font-bold">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

const RoleToggle = ({ role, setRole }) => (
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
        />
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
);

export default Login;
