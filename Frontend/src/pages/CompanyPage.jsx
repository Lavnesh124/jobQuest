import CompanyCard from "@/components/CompanyCard";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { GET_ALL_COMPANIES } from "@/utils/constant";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCreateNewCompany = () => {
    navigate("/company/register");
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(GET_ALL_COMPANIES);
        setCompanies(res.data.companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    if (!Array.isArray(companies)) return [];
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) =>
      (c.companyname || c.name || "").toLowerCase().includes(q)
    );
  }, [companies, search]);

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center rounded-full border border-[#1B1F1D]/15 bg-white overflow-hidden max-w-md w-full focus-within:ring-2 focus-within:ring-[#1F6B4C]/30 focus-within:border-[#1F6B4C] transition-shadow">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies…"
              className="w-full outline-none bg-transparent text-[#1B1F1D] text-sm px-4 py-2.5 placeholder:text-[#1B1F1D]/40"
            />
            <div className="flex items-center justify-center bg-[#1F6B4C] px-4 py-2.5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="14px"
                className="fill-white"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateNewCompany}
            className="bg-[#1F6B4C] hover:bg-[#18543B] transition-colors text-white font-semibold text-sm rounded-full px-5 py-2.5"
          >
            Create new company
          </button>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-white border border-[#1B1F1D]/8 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-mono text-xs uppercase tracking-widest text-[#1B1F1D]/40 mb-2">
              No results
            </p>
            <p className="text-[#1B1F1D]/60">
              {search
                ? `No companies match "${search}".`
                : "No companies to show yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company._id} company={company} id={company._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;