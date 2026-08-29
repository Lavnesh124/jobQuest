import UserAppliedjob from "@/components/UserAppliedjob";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JobOpeningPage = () => {
  console.log("Component rendering");
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Current job ID:", id);

  useEffect(() => {
    console.log("useEffect triggered");

    const fetchApplications = async () => {
      console.log("Starting fetch request");
      setIsLoading(true);
      try {
        const url = `http://localhost:8021/api/v1/application/job/${id}`;
        console.log("Fetching from URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log("Response received:", response.status);
        const result = await response.json();
        console.log("Full API Response:", result);

        if (response.ok) {
          console.log(
            "Number of applications received:",
            result.applications?.length || 0
          );
          setApplications(result.applications || []);

          if (result.applications && result.applications.length > 0) {
            result.applications.forEach((application, index) => {
              console.log(`\nApplication #${index + 1}:`);
              console.log("Application ID:", application._id);
              console.log("Application Status:", application.status);
              console.log(
                "Created At:",
                new Date(application.createdAt).toLocaleDateString()
              );

              console.log("\nApplicant Details:");
              console.log("Full Name:", application.applicant?.fullname);
              console.log("Email:", application.applicant?.email);
              console.log("Phone:", application.applicant?.phoneNumber);

              console.log("\nJob Details:");
              console.log("Job Title:", application.job?.title);
              console.log("Job Description:", application.job?.description);
              console.log("Salary:", application.job?.salary);
              console.log("Location:", application.job?.location);
              console.log("Job Type:", application.job?.jobType);
              console.log(
                "Experience Level:",
                application.job?.experienceLevel
              );

              console.log("\n----------------------------------------");
            });
          } else {
            console.log("No applications found in the response");
          }
        } else {
          console.error("API Error Response:", result);
          // TODO: Re-enable login redirect when auth is back
          // if (result.message === "User not authenticated") {
          //   toast.error("Please login to view applications");
          //   navigate("/login");
          // } else {
          toast.error(result.message || "Failed to fetch applications");
          // }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("An error occurred while fetching applications");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      console.log("Calling fetchApplications with job ID:", id);
      fetchApplications();
    } else {
      console.log("No job ID provided - fetch not called");
      setIsLoading(false);
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#14201B]">Job applications</h1>
          <p className="text-[#14201B]/50 text-sm mt-1">
            View and manage applications for this job posting.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-white border border-[#1B1F1D]/8 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => (
              <UserAppliedjob key={application._id} application={application} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white border border-dashed border-[#1B1F1D]/15 rounded-2xl px-8 py-14">
            <p className="text-[#14201B] text-lg font-medium">No applications yet</p>
            <p className="text-sm text-[#14201B]/40 mt-2">
              Applications for this posting will show up here.
            </p>
            <p className="text-xs text-[#14201B]/30 mt-4 font-mono">Job ID: {id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOpeningPage;