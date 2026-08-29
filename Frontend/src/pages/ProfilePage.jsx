import AppliedJobsCard from "@/components/AppliedJobsCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_URL = "http://localhost:8021/api/v1/user/profile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(PROFILE_URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));

        if (cancelled) return;

        if (!res.ok) {
          setError(data.message || "Could not load profile");
          setUser(null);
          return;
        }

        setUser(data.user ?? null);
      } catch {
        if (!cancelled) setError("Network error loading profile");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleEditClick = () => {
    navigate("/profile/update");
  };

  const phoneDisplay =
    user?.phoneNumber != null && user.phoneNumber !== ""
      ? String(user.phoneNumber)
      : "—";

  const profile = user?.profile ?? {};
  const skillsList = Array.isArray(profile.skills) ? profile.skills : [];
  const appliedJobs = Array.isArray(user?.appliedJobs) ? user.appliedJobs : [];

  const initials = (user?.fullname || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-[#1B1F1D]/8 overflow-hidden">
          <div className="bg-[#0F1D17] px-8 py-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1F6B4C] flex items-center justify-center text-white font-semibold text-lg shrink-0">
                {initials || "—"}
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold">
                  {loading ? "Loading…" : user?.fullname || "Profile"}
                </h1>
                {user?.role && (
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-widest text-[#F4C15C] font-medium">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className="bg-[#1F6B4C] hover:bg-[#18543B] transition-colors text-white font-medium text-sm rounded-full px-5 py-2.5 shrink-0"
            >
              Edit profile
            </button>
          </div>

          <div className="px-8 py-8">
            {loading && (
              <div className="space-y-4 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 bg-[#1B1F1D]/8 rounded w-2/3" />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="border-l-4 border-[#E2725B] bg-[#E2725B]/8 px-4 py-3 rounded-r-lg">
                <p className="text-[#B5482F] text-sm">{error}</p>
              </div>
            )}

            {!loading && user && (
              <dl className="divide-y divide-[#1B1F1D]/8">
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Phone number" value={phoneDisplay} />
                {user.role === "recruiter" && user.companyname && (
                  <InfoRow label="Company" value={user.companyname} />
                )}
                <InfoRow label="Bio" value={profile.bio?.trim() || null} multiline />
                <InfoRow
                  label="Skills"
                  value={
                    skillsList.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skillsList.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium bg-[#1F6B4C]/8 text-[#1F6B4C] px-2.5 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : null
                  }
                />
              </dl>
            )}
          </div>
        </div>

        {/* Applied jobs */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#14201B] mb-5">Applied jobs</h2>

          {appliedJobs.length === 0 && !loading ? (
            <div className="bg-white border border-dashed border-[#1B1F1D]/15 rounded-2xl px-8 py-10 text-center">
              <p className="text-[#14201B]/50 text-sm">
                No applications yet — jobs you apply to will show up here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {appliedJobs.length > 0
                ? appliedJobs.map((job) => (
                    <AppliedJobsCard key={job._id ?? job.id} job={job} />
                  ))
                : loading && (
                    <>
                      <div className="h-24 bg-white border border-[#1B1F1D]/8 rounded-2xl animate-pulse" />
                      <div className="h-24 bg-white border border-[#1B1F1D]/8 rounded-2xl animate-pulse" />
                    </>
                  )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, multiline = false }) => (
  <div className={`py-4 grid grid-cols-3 gap-4 ${multiline ? "items-start" : "items-center"}`}>
    <dt className="text-sm font-medium text-[#14201B]/50">{label}</dt>
    <dd className="col-span-2 text-sm text-[#14201B]">
      {value ?? <span className="text-[#14201B]/30">—</span>}
    </dd>
  </div>
);

export default ProfilePage;