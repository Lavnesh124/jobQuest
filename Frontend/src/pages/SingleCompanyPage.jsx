import JobRoleCard from "@/components/JobRoleCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleCompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateNewCompany = () => {
    navigate(`/jobs/register/${id}`);
  };

  useEffect(() => {
    const fetchCompanyAndJobs = async () => {
      try {
        // Fetch company details
        const companyRes = await axios.get(
          `http://localhost:8021/api/v1/company/get/${id}`
        );
        setCompany(companyRes.data.company);

        // Fetch company jobs
        const jobsRes = await axios.get(
          `http://localhost:8021/api/v1/job/company/${id}`
        );
        setJobs(jobsRes.data.jobs);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAndJobs();
  }, [id]);

  if (loading) return <div className="m-20">Loading...</div>;
  if (!company) return <div className="m-20">Company not found</div>;

  return (
    <div>
      {/* Company Info */}
      <div className="m-20">
        <div className="text-xl font-bold">{company.companyname}</div>
        <p className="text-gray-600">{company.description}</p>
        <p className="text-sm text-blue-600">{company.website}</p>
        <p className="text-sm text-gray-500">Location: {company.location}</p>
      </div>

      {/* Search & Button */}
      <div className="m-20 flex justify-between items-center">
        <div className="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md font-[sans-serif]">
          <input
            type="text"
            placeholder="Search Jobs..."
            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
          />
          <button
            type="button"
            className="flex items-center justify-center bg-[#007bff] px-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              className="fill-white"
            >
              <path d="M10 2a8 8 0 105.293 14.707l5 5a1 1 0 001.414-1.414l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </button>
        </div>
        <div className="mx-20">
          <button
            onClick={handleCreateNewCompany}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-20"
          >
            Create New Job
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="m-20">
        <h2 className="text-lg font-semibold mb-4">Job Roles</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobRoleCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCompanyPage;
