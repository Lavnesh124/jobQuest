import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GET_JOB_DETAILS_BY_ID } from "@/utils/constant";
import axios from "axios";
import { useState } from "react";

const fetchJobById = async (id) => {
  try {
    const response = await axios.get(GET_JOB_DETAILS_BY_ID(id));
    return response.data.job;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || "Failed to fetch job";
    throw new Error(message);
  }
};

const JobApplyPage = () => {
  const { id } = useParams();
  const [applyStatus, setApplyStatus] = useState("Apply");

  const {
    data: job,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });

  const handleApply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8021/api/v1/application/apply/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        setApplyStatus("Applied");
        console.log("successful");
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-100 h-100">
      <div className="w-full h-50 flex justify-between mt-10">
        <div className="ml-20 text-2xl font-bold">{job.title}</div>
        <button
          type="button"
          className={`rounded-full px-5 py-2.5 mr-20 ${
            applyStatus === "Applied"
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          } text-white`}
          onClick={handleApply}
          disabled={applyStatus === "Applied"}
        >
          {applyStatus}
        </button>
      </div>
      <div className="ml-20 mt-8 flex gap-4">
        <span className="bg-yellow-400 px-3 py-1 rounded-full text-white text-sm">
          ₹{job.salary} LPA
        </span>
        <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-sm">
          {job.position}
        </span>
        <span className="bg-purple-700 px-3 py-1 rounded-full text-white text-sm">
          {job.location}
        </span>
      </div>
      <div className="ml-20 mt-8 text-2xl">Job Description</div>
      <div className="bg-pink-200 mx-20 my-10 p-10 whitespace-pre-line">
        {job.description}
      </div>
    </div>
  );
};

export default JobApplyPage;
