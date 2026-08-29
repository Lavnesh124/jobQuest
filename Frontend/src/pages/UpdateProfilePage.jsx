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

  const skillChips = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-6 py-12">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#1B1F1D]/8 overflow-hidden">
          <div className="bg-[#0F1D17] px-8 py-7">
            <h1 className="text-white text-xl font-semibold">Update profile</h1>
            <p className="text-white/50 text-sm mt-1">
              {loadingProfile ? "Loading current details…" : "Keep your details current."}
            </p>
          </div>

          <div className="px-8 py-8">
            {error && (
              <div className="mb-6 border-l-4 border-[#E2725B] bg-[#E2725B]/8 px-4 py-3 rounded-r-lg">
                <p className="text-[#B5482F] text-sm">{error}</p>
              </div>
            )}

            <FieldLabel>Full name</FieldLabel>
            <TextInput
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={loadingProfile}
            />

            <FieldLabel>Email</FieldLabel>
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loadingProfile}
            />

            <FieldLabel>Phone number</FieldLabel>
            <TextInput
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="9876543210"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              disabled={loadingProfile}
            />

            <FieldLabel>Bio</FieldLabel>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              disabled={loadingProfile}
              placeholder="Backend developer"
              className="w-full px-3.5 py-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm text-[#1B1F1D] focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30 focus:border-[#1F6B4C] transition-shadow resize-y mb-6 disabled:opacity-60"
            />

            <FieldLabel>Skills</FieldLabel>
            <TextInput
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Node.js,Express,MongoDB"
              disabled={loadingProfile}
              noMargin
            />
            <p className="text-xs text-[#1B1F1D]/40 mt-1.5 mb-2">
              Comma-separated, e.g. Node.js,Express,MongoDB
            </p>
            {skillChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {skillChips.map((skill, i) => (
                  <span
                    key={`${skill}-${i}`}
                    className="text-xs font-medium bg-[#1F6B4C]/8 text-[#1F6B4C] px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || loadingProfile}
              className="w-full bg-[#1F6B4C] text-white font-semibold py-3 rounded-full hover:bg-[#18543B] transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Updating…" : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const FieldLabel = ({ children }) => (
  <label className="block text-sm font-medium text-[#14201B]/70 mb-1.5">{children}</label>
);

const TextInput = ({ noMargin, ...props }) => (
  <input
    {...props}
    className={`w-full px-3.5 py-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm text-[#1B1F1D] focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30 focus:border-[#1F6B4C] transition-shadow disabled:opacity-60 ${
      noMargin ? "" : "mb-6"
    }`}
  />
);

export default UpdateProfilePage;