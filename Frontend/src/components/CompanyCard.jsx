import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/company/${company._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer mx-auto my-4 w-11/12 md:w-3/4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {company.companyname}
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        {company.description || "No description available."}
      </p>
      <div className="mt-3 text-sm text-gray-500">
        <p>Location: {company.location || "N/A"}</p>
        <p>Industry: {company.industry || "N/A"}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
