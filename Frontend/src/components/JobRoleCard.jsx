import React from 'react'
import { useNavigate } from 'react-router-dom';

const JobRoleCard = () => {

    const navigate = useNavigate();  // Hook for navigation

    const handleClick = () => {
        navigate('/role-details');  // Example route, change it to where you want to navigate
    };


    return (
        <>
            <div className="bg-gray-300  mx-10 my-10  px-10 py-5 " onClick={handleClick}>
                <div className=" text-l font-bold">
                    Role
                </div>
                <div className=" text-l font-bold">
                    package
                </div>
            </div>

        </>
    )
}

export default JobRoleCard
