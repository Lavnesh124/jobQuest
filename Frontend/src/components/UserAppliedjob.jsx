import PropTypes from "prop-types";
import toast from "react-hot-toast";

const UserAppliedjob = ({ application }) => {
  const handleAccept = async () => {
    try {
      const response = await fetch(
        `http://localhost:8021/api/v1/application/accept/${application._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Application accepted successfully");
      } else {
        toast.error(result.message || "Failed to accept application");
      }
    } catch (error) {
      toast.error("An error occurred while accepting the application");
      console.error("Error:", error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await fetch(
        `http://localhost:8021/api/v1/application/decline/${application._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Application declined successfully");
      } else {
        toast.error(result.message || "Failed to decline application");
      }
    } catch (error) {
      toast.error("An error occurred while declining the application");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg mx-10 my-10 px-10 py-5 flex justify-between items-center">
      <div className="space-y-2">
        <div className="text-lg font-semibold text-gray-800">
          {application.applicant?.fullname || "User Name"}
        </div>
        <div className="text-gray-600">
          {application.applicant?.email || "Email"}
        </div>
        <div className="text-gray-600">
          {application.applicant?.phoneNumber || "Phone Number"}
        </div>
        <div className="text-sm text-gray-500">
          Applied for: {application.job?.title || "Job Title"}
        </div>
        <div className="text-sm text-gray-500">
          Status:{" "}
          <span
            className={`font-semibold ${
              application.status === "accepted"
                ? "text-green-600"
                : application.status === "declined"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {application.status || "pending"}
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleAccept}
          type="button"
          disabled={application.status === "accepted"}
          className={`text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ${
            application.status === "accepted"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Accept User
        </button>
        <button
          onClick={handleDecline}
          type="button"
          disabled={application.status === "declined"}
          className={`text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ${
            application.status === "declined"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Decline User
        </button>
      </div>
    </div>
  );
};

UserAppliedjob.propTypes = {
  application: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    applicant: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
    job: PropTypes.shape({
      title: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
};

export default UserAppliedjob;
