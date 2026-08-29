import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_URL = "http://localhost:8021/api/v1/user/profile";
const UPDATE_URL = "http://localhost:8021/api/v1/user/profile/update";

const UpdateProfilePage = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await fetch(PROFILE_URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled || !res.ok || !data.user) return;

        const u = data.user;
        setFullName(u.fullname ?? "");
        setEmail(u.email ?? "");
        setPhoneNumber(
          u.phoneNumber != null && u.phoneNumber !== ""
            ? String(u.phoneNumber)
            : ""
        );
        setBio(u.profile?.bio ?? "");
        const sk = u.profile?.skills;
        setSkills(Array.isArray(sk) ? sk.join(",") : sk ?? "");
      } catch {
        /* ignore pre-fill failures */
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phoneNum = Number(String(phoneNumber).trim());
    if (!Number.isFinite(phoneNum) || String(phoneNumber).trim() === "") {
      setError("Enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        fullname,
        email,
        phoneNumber: phoneNum,
        bio,
        skills,
      };

      const response = await fetch(UPDATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.message || result.error || "Update failed");
        return;
      }

      navigate("/profile");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100 p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update profile</h2>

        {loadingProfile && (
          <p className="text-sm text-gray-600 mb-4 text-center">
            Loading current profile…
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="fullname"
          >
            Full name
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
            htmlFor="phoneNumber"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="9876543210"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263] resize-y"
            placeholder="Backend developer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="skills">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Node.js,Express,MongoDB"
          />
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated, same as API (e.g. Node.js,Express,MongoDB)
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || loadingProfile}
          className="w-full bg-[#00A263] text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200 mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Updating…" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
