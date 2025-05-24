import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function JobCard({ job }) {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate(`/jobApply/${job._id}`);
  };

  const handleSaveClick = () => {
    console.log("Saved job:", job._id);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 relative ml-8 mr-8 bg-slate-100">
      <div className="pl-5">
        <h5 className="font-bold text-xl mb-2">{job.title}</h5>
        <h6 className="text-gray-600 mb-4">{job.companyId?.companyname}</h6>
      </div>
      <div>
        <p className="text-gray-700 text-base">
          {job.description.length > 100
            ? job.description.substring(0, 100) + "..."
            : job.description}
        </p>
        <div className="mt-4">
          <button
            onClick={handleApplyClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-4"
          >
            Apply
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    companyId: PropTypes.shape({
      companyname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default JobCard;
