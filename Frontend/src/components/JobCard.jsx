// JobCard.jsx
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
    <div className="group rounded-2xl bg-white border border-[#1B1F1D]/8 p-6 hover:shadow-[0_8px_24px_rgb(31,107,76,0.10)] hover:-translate-y-0.5 transition-all duration-200">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#1F6B4C]/60 mb-3">
        Open Role
      </p>

      <h5
        className="font-bold text-xl text-[#1B1F1D] mb-1 group-hover:text-[#1F6B4C] transition-colors"
        style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
      >
        {job.title}
      </h5>
      <h6 className="text-sm text-[#1B1F1D]/50 mb-4">
        {job.companyId?.companyname}
      </h6>

      <p className="text-[#1B1F1D]/70 text-sm leading-relaxed mb-5">
        {job.description.length > 100
          ? job.description.substring(0, 100) + "..."
          : job.description}
      </p>

      <div className="border-t border-dashed border-[#1B1F1D]/12 pt-4 flex gap-3">
        <button
          onClick={handleApplyClick}
          className="bg-[#1F6B4C] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#18543B] transition-colors"
        >
          Apply
        </button>
        <button
          onClick={handleSaveClick}
          className="border border-[#1B1F1D]/15 text-[#1B1F1D]/70 px-5 py-2 rounded-full text-sm font-semibold hover:border-[#1F6B4C] hover:text-[#1F6B4C] transition-colors"
        >
          Save
        </button>
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