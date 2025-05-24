import React from 'react'

const UserAppliedjob = () => {
    return (
        <>

            <div className="bg-gray-300  mx-10 my-10  px-10 py-5  flex  justify-between">
                <div>
                    <div className=" text-l font-bold">
                        UserName
                    </div>
                    <div className=" text-l font-bold">
                        email
                    </div>
                    <div className=" text-l font-bold">
                        phoneNumber
                    </div>
                </div>
                <div>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-20 ">
                        Accept User
                    </button>
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-20 ">
                        Decline User
                    </button>

                </div>



            </div>


        </>
    )
}

export default UserAppliedjob
