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
  const skillsText =
    Array.isArray(profile.skills) && profile.skills.length > 0
      ? profile.skills.join(", ")
      : "—";

  return (
    <>
      <div className=" m-20  bg-gray-300 p-10">
        <div className=" mt-4  text-xl font-bold flex justify-between ">
          <div>Basic info</div>
          <button
            type="button"
            onClick={handleEditClick}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit Profile
          </button>
        </div>

        {loading && (
          <p className="mt-5 text-gray-600">Loading profile…</p>
        )}
        {!loading && error && (
          <p className="mt-5 text-red-600">{error}</p>
        )}
        {!loading && user && (
          <>
            <div className="flex justify-content mt-5">
              <div>Name</div>
              <div className="ml-20">{user.fullname || "—"}</div>
            </div>
            <div className="flex justify-content mt-8">
              <div>Email</div>
              <div className="ml-20">{user.email || "—"}</div>
            </div>
            <div className="flex justify-content mt-8">
              <div>Phone Number</div>
              <div className="ml-20">{phoneDisplay}</div>
            </div>
            <div className="flex justify-content mt-8">
              <div>Role</div>
              <div className="ml-20">{user.role || "—"}</div>
            </div>
            {user.role === "recruiter" && user.companyname != null && (
              <div className="flex justify-content mt-8">
                <div>Company</div>
                <div className="ml-20">{user.companyname}</div>
              </div>
            )}
            <div className="flex justify-content mt-8">
              <div>Bio</div>
              <div className="ml-20">{profile.bio?.trim() ? profile.bio : "—"}</div>
            </div>
            <div className="flex justify-content mt-8">
              <div>Skills</div>
              <div className="ml-20">{skillsText}</div>
            </div>
          </>
        )}
      </div>
      <div className="ml-20 text-2xl font-bold mb-10">Applied Job</div>
      <AppliedJobsCard />
      <AppliedJobsCard />
    </>
  );
};

export default ProfilePage;
