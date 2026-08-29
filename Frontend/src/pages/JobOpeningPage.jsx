import UserAppliedjob from "@/components/UserAppliedjob";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JobOpeningPage = () => {
  console.log("Component rendering");
  const [applications, setApplications] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Current job ID:", id);

  useEffect(() => {
    console.log("useEffect triggered");

    const fetchApplications = async () => {
      console.log("Starting fetch request");
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
      }
    };

    if (id) {
      console.log("Calling fetchApplications with job ID:", id);
      fetchApplications();
    } else {
      console.log("No job ID provided - fetch not called");
    }
  }, [id, navigate]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
        <p className="text-gray-600">
          View and manage applications for this job posting
        </p>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => (
            <UserAppliedjob key={application._id} application={application} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-lg">No applications found</p>
          <p className="text-sm text-gray-500 mt-2">Job ID: {id}</p>
        </div>
      )}
    </div>
  );
};

export default JobOpeningPage;
