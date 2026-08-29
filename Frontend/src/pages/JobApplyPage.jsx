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

// Small inline icons so we don't add an icon-library dependency
const WalletIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="2.5" y="6" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19" />
    <circle cx="17" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const BriefcaseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="2.5" y="7.5" width="19" height="12" rx="2.5" />
    <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
    <path d="M2.5 13h19" />
  </svg>
);
const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.2" />
  </svg>
);

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
        { withCredentials: true },
      );
      if (response.data) {
        setApplyStatus("Applied");
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#1F6B4C] font-mono text-sm tracking-wide">
          <span className="h-2 w-2 rounded-full bg-[#1F6B4C] animate-ping" />
          LOADING ROLE…
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-6">
        <div className="max-w-sm text-center border border-[#E2725B]/30 bg-white rounded-2xl p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#E2725B] mb-2">
            Couldn't load this role
          </p>
          <p className="text-[#1B1F1D]/70 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  const applied = applyStatus === "Applied";

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-16 px-6">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }
        .ticket-enter { animation: fadeUp .5s ease-out both; }
      `}</style>

      <div className="max-w-4xl mx-auto ticket-enter">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#1F6B4C]/70 mb-3 pl-1">
          Open Role · #{id?.slice(0, 8)}
        </p>

        {/* Ticket card */}
        <div className="relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(31,107,76,0.08)] overflow-hidden md:flex">
          {/* Main panel */}
          <div className="flex-1 p-8 md:p-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#1B1F1D] leading-tight"
              style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
            >
              {job.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/40 mb-1">
                  Salary
                </p>
                <p className="flex items-center gap-1.5 text-[#D98E2B] font-semibold text-lg">
                  <WalletIcon className="w-4 h-4" />
                  ₹{job.salary} LPA
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/40 mb-1">
                  Type
                </p>
                <p className="flex items-center gap-1.5 text-[#1B1F1D] font-semibold text-lg">
                  <BriefcaseIcon className="w-4 h-4 text-[#1F6B4C]" />
                  {job.position}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/40 mb-1">
                  Location
                </p>
                <p className="flex items-center gap-1.5 text-[#1B1F1D] font-semibold text-lg">
                  <PinIcon className="w-4 h-4 text-[#1F6B4C]" />
                  {job.location}
                </p>
              </div>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="relative hidden md:block w-px">
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#FAF8F3]" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#FAF8F3]" />
            <div className="h-full border-l-2 border-dashed border-[#1B1F1D]/15" />
          </div>
          <div className="block md:hidden relative h-px mx-8">
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#FAF8F3]" />
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#FAF8F3]" />
            <div className="w-full border-t-2 border-dashed border-[#1B1F1D]/15" />
          </div>

          {/* Stub panel */}
          <div className="md:w-56 bg-[#F1F0E8] p-8 md:p-8 flex md:flex-col items-center justify-between md:justify-center gap-4 relative">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#1B1F1D]/40 md:mb-2">
              Application
            </p>

            {applied ? (
              <div className="relative">
                <div className="rotate-[-8deg] border-2 border-[#1F6B4C] text-[#1F6B4C] rounded-lg px-4 py-2 font-mono text-sm uppercase tracking-widest font-bold">
                  ✓ Applied
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleApply}
                className="bg-[#1F6B4C] hover:bg-[#18543B] transition-colors text-white font-semibold rounded-full px-8 py-3 shadow-sm"
              >
                Apply now
              </button>
            )}
          </div>
        </div>

        {/* Briefing panel */}
        <div className="mt-6 bg-white rounded-2xl border-l-4 border-[#D98E2B] p-8 md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#1F6B4C]/70 mb-4">
            The Briefing
          </p>
          <div
            className="text-[#1B1F1D]/85 text-lg leading-relaxed whitespace-pre-line"
            style={{ fontFamily: "ui-serif, Georgia, serif" }}
          >
            {job.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplyPage;