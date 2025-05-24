import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobRegisterPage = () => {
  const { id: companyId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const jobData = {
        title,
        description,
        requirements,
        salary: parseInt(salary),
        location,
        jobType,
        experience: parseInt(experience),
        position: parseInt(position),
        companyId,
      };

      const response = await fetch("http://localhost:8021/api/v1/job/post", {
        method: "POST",
        body: JSON.stringify(jobData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to create job posting");
        console.error(result.error);
      } else {
        // Clear form fields
        setTitle("");
        setDescription("");
        setRequirements("");
        setSalary("");
        setLocation("");
        setJobType("");
        setExperience("");
        setPosition("");

        // Navigate back to company page after successful job posting
        navigate(`/company/${companyId}`);
      }
    } catch (error) {
      setError("An error occurred while creating the job posting");
      console.error("Job posting error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100 p-10">
      <form
        onSubmit={handleCreate}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="e.g. Backend Developer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Describe the role"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Requirements
          </label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="e.g. Node.js, MongoDB, Express.js"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Salary (in LPA)
          </label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            min="0"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="e.g. 15"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="e.g. Bangalore"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
          >
            <option value="">Select Type</option>
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Experience (years)
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            min="0"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="e.g. 2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Open Positions
          </label>
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            min="1"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#00A263]"
            placeholder="e.g. 3"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#00A263] text-white rounded hover:bg-green-700 transition duration-200"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default JobRegisterPage;
