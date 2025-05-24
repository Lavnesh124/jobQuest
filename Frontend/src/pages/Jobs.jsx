import JobCard from "@/components/JobCard";
import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8021/api/v1/job/get"); // adjust to your real API
        setJobs(res.data.jobs); // adjust based on your response structure
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex">
      <div className="h-auto w-80 bg-purple-300 p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Job Type Filter */}
        <div className="mb-4">
          <label className="block font-medium">Job Type</label>
          <select className="w-full mt-1 p-2 rounded">
            <option value="">All</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="mb-4">
          <label className="block font-medium">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full mt-1 p-2 rounded"
          />
        </div>

        {/* Experience Filter */}
        <div className="mb-4">
          <label className="block font-medium">Experience</label>
          <input
            type="number"
            placeholder="Years of experience"
            className="w-full mt-1 p-2 rounded"
          />
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Apply Filters
        </button>
      </div>

      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-4 mt-10">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
