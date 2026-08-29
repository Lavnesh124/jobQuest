// Jobs.jsx
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

const SkeletonCard = () => (
  <div className="rounded-2xl bg-white border border-[#1B1F1D]/8 p-6 animate-pulse">
    <div className="h-3 w-20 bg-[#1F6B4C]/10 rounded mb-4" />
    <div className="h-5 w-3/4 bg-[#1B1F1D]/10 rounded mb-2" />
    <div className="h-3 w-1/2 bg-[#1B1F1D]/10 rounded mb-6" />
    <div className="h-3 w-full bg-[#1B1F1D]/10 rounded mb-2" />
    <div className="h-3 w-5/6 bg-[#1B1F1D]/10 rounded mb-6" />
    <div className="flex gap-3">
      <div className="h-9 w-20 bg-[#1B1F1D]/10 rounded-full" />
      <div className="h-9 w-20 bg-[#1B1F1D]/10 rounded-full" />
    </div>
  </div>
);

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8021/api/v1/job/get");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#1F6B4C]/70 mb-2">
              {isLoading ? "Loading…" : `${jobs.length} roles available`}
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold text-[#1B1F1D]"
              style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
            >
              Open Roles
            </h1>
          </div>

          <Sheet>
            <SheetTrigger className="flex items-center gap-2 px-5 py-2.5 bg-[#1F6B4C] text-white rounded-full font-semibold text-sm hover:bg-[#18543B] transition-colors">
              <FaFilter className="text-xs" /> Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-[#FAF8F3]">
              <SheetHeader>
                <SheetTitle
                  className="text-[#1B1F1D]"
                  style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
                >
                  Filter Jobs
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/50 mb-1.5">
                    Job Type
                  </label>
                  <select className="w-full p-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30">
                    <option value="">All</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/50 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/50 mb-1.5">
                    Experience
                  </label>
                  <input
                    type="number"
                    placeholder="Years of experience"
                    className="w-full p-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30"
                  />
                </div>

                <button className="w-full mt-2 bg-[#1F6B4C] text-white px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-[#18543B] transition-colors">
                  Apply Filters
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Job Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-mono text-xs uppercase tracking-widest text-[#1B1F1D]/40 mb-2">
              Nothing here yet
            </p>
            <p className="text-[#1B1F1D]/60">
              No open roles match right now — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;