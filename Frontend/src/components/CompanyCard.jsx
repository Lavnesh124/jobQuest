import React from 'react'
import { useNavigate } from 'react-router-dom';


const CompanyCard = ({company}) => {
    const navigate = useNavigate();  // Hook for navigation

    const handleClick = () => {
        console.log(company._id);
        navigate(`/company/${company._id}`);  // Example route, change it to where you want to navigate
    };

    return (
        <>
            <div className="flex justify-between  items-center mx-20 bg-gray-300 my-5 h-20">
                <div className='pl-20'>
                    {company.companyname}
                </div>

                <button type="button"
                    onClick={handleClick}
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-20 ">
                    View Jobs
                </button>
            </div>
        </>
    )
}

export default CompanyCard
