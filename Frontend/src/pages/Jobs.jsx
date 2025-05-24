import JobCard from "@/components/JobCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8021/api/v1/job/get");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex-row">
      {/* Filter Button */}
      <div className="flex justify-end items-center gap-2 my-4 mr-3">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            <FaFilter /> Filters
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Jobs</SheetTitle>
            </SheetHeader>

            {/* Filter Form */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block font-medium mb-1">Job Type</label>
                <select className="w-full p-2 border rounded">
                  <option value="">All</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Experience</label>
                <input
                  type="number"
                  placeholder="Years of experience"
                  className="w-full p-2 border rounded"
                />
              </div>

              <button className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Apply Filters
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Job Cards */}
      <div className="flex p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
