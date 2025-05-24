import React from "react";
import AppliedJobsCard from "@/components/AppliedJobsCard";
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/profile/update');  // Example route, change it to where you want to navigate
    };

    return <>
        <div className=" m-20  bg-gray-300 p-10">
            <div className=" mt-4  text-xl font-bold flex justify-between ">
                <div>
                    Basic info
                </div>
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Edit Profile
                </button>
            </div>
            <div className="flex justify-content mt-5">
                <div>
                    Name
                </div>
                <div className="ml-20">
                    username
                </div>
            </div>
            <div className="flex justify-content mt-8">
                <div>
                    Email
                </div>
                <div className="ml-20">
                    username@email.com
                </div>
            </div>
            <div className="flex justify-content mt-8">
                <div>
                    Pnone Number
                </div>
                <div className="ml-20">
                    7477233018
                </div>
            </div>
            <div className="flex justify-content mt-8">
                <div>
                    Role
                </div>
                <div className="ml-20">
                    userRole
                </div>
            </div>
        </div>
        <div className="ml-20 text-2xl font-bold mb-10">
            Applied Job
        </div>
        <AppliedJobsCard />
        <AppliedJobsCard />


    </>
};

export default ProfilePage;