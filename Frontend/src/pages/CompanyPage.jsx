import CompanyCard from "@/components/CompanyCard";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_COMPANIES } from "@/utils/constant";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleCreateNewCompany = () => {
    navigate("/company/register"); // Navigate to /company/register
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(GET_ALL_COMPANIES); // Update the endpoint if needed
        //console.log(res.data.companies);
        setCompanies(res.data.companies); // Expecting res.data to be an array of companies
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <div className="m-20 flex justify-between items-center">
        <div className="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md  font-[sans-serif] mx-20">
          <input
            type="email"
            placeholder="Search Companies..."
            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
          />
          <button
            type="button"
            className="flex items-center justify-center bg-[#007bff] px-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
        <div className="mx-20">
          <button
            type="button"
            onClick={handleCreateNewCompany}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-20 "
          >
            Create New Company
          </button>
        </div>
      </div>
      {Array.isArray(companies) &&
        companies.map((company) => (
          <CompanyCard key={company._id} company={company} id={company._id} />
        ))}
    </div>
  );
};

export default CompanyPage;
