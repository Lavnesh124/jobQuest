import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobRegisterPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [position, setPosition] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience: parseInt(experience),
      position: parseInt(position),
    };

    console.log(jobData); // replace with API POST call later

    // Example: navigate after successful API call
    navigate("/company");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100 p-10">
      <form
        onSubmit={handleCreate}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
            placeholder="Describe the role"
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
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g. Bangalore"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g. 3"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default JobRegisterPage;
