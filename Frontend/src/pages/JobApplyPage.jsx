
import { Button } from "@material-tailwind/react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from "react";

const JobApplyPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { id } = useParams();  // Extract job ID from route
    const [job, setJob] = useState(null);

    const getJobData = async () => {
        try {
          const response = await fetch(`http://localhost:8021/api/v1/job/get/${id}`);
          const result = await response.json();
    
          if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch job');
          }
          console.log(result);
          setJob(result.job);  // Assuming your API sends { job: { ... } }
        } catch (err) {
          setError(err.message);
        }
      };
    
      useEffect(() => {
        getJobData();
      }, [id]);



      if (error) return <div>Error: {error}</div>;
      if (!job) return <div>Loading...</div>;
    
      return (
        <div className="w-100 h-100">
          <div className="w-full h-50 flex justify-between mt-10">
            <div className="ml-20 text-2xl font-bold">
              {job.title}
            </div>
            <button type="button" className="bg-green-700 text-white rounded-full px-5 py-2.5 mr-20">
              Apply Now
            </button>
          </div>
          <div className="ml-20 mt-8 flex gap-4">
            <span className="bg-yellow-400 px-3 py-1 rounded-full text-white text-sm">₹{job.salary} LPA</span>
            <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-sm">{job.position}</span>
            <span className="bg-purple-700 px-3 py-1 rounded-full text-white text-sm">{job.location}</span>
          </div>
          <div className="ml-20 mt-8 text-2xl">Job Description</div>
          <div className="bg-pink-200 mx-20 my-10 p-10 whitespace-pre-line">
            {job.description}
          </div>
        </div>
      );
    };
    
    export default JobApplyPage;