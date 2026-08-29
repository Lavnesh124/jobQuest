import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
  const [companyname, setCompanyname] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [companypassword, setCompanyPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    const addCompany = {
      companyname: companyname,
      website: website,
      location: location,
      description: description,
      companypassword: companypassword,
    };

    setSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:8021/api/v1/company/register",
        {
          method: "POST",
          body: JSON.stringify(addCompany),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Could not create company");
      } else {
        setCompanyname("");
        setDescription("");
        setLocation("");
        setWebsite("");
        setCompanyPassword("");
        navigate("/company");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-6 py-12">
      <form onSubmit={handleCreate} className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#1B1F1D]/8 overflow-hidden">
          <div className="bg-[#0F1D17] px-8 py-7">
            <h1 className="text-white text-xl font-semibold">Register company</h1>
            <p className="text-white/50 text-sm mt-1">
              Set up your company profile to start posting roles.
            </p>
          </div>

          <div className="px-8 py-8">
            {error && (
              <div className="mb-6 border-l-4 border-[#E2725B] bg-[#E2725B]/8 px-4 py-3 rounded-r-lg">
                <p className="text-[#B5482F] text-sm">{error}</p>
              </div>
            )}

            <FieldLabel htmlFor="companyname">Company name</FieldLabel>
            <TextInput
              id="companyname"
              value={companyname}
              onChange={(e) => setCompanyname(e.target.value)}
              placeholder="Enter your company name"
              required
            />

            <FieldLabel htmlFor="website">Website</FieldLabel>
            <TextInput
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourcompany.com"
              required
            />

            <FieldLabel htmlFor="location">Location</FieldLabel>
            <TextInput
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              required
            />

            <FieldLabel htmlFor="description">Description</FieldLabel>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="What does your company do?"
              className="w-full px-3.5 py-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm text-[#1B1F1D] focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30 focus:border-[#1F6B4C] transition-shadow resize-y mb-6"
            />

            <FieldLabel htmlFor="companypassword">Company password</FieldLabel>
            <TextInput
              id="companypassword"
              type="password"
              value={companypassword}
              onChange={(e) => setCompanyPassword(e.target.value)}
              placeholder="Enter password for company"
              required
              noMargin
            />
            <p className="text-xs text-[#1B1F1D]/40 mt-1.5 mb-6">
              Recruiters will use this to join your company.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1F6B4C] text-white font-semibold py-3 rounded-full hover:bg-[#18543B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating…" : "Create company"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const FieldLabel = ({ children, htmlFor }) => (
  <label className="block text-sm font-medium text-[#14201B]/70 mb-1.5" htmlFor={htmlFor}>
    {children}
  </label>
);

const TextInput = ({ noMargin, ...props }) => (
  <input
    {...props}
    className={`w-full px-3.5 py-2.5 border border-[#1B1F1D]/15 rounded-lg bg-white text-sm text-[#1B1F1D] focus:outline-none focus:ring-2 focus:ring-[#1F6B4C]/30 focus:border-[#1F6B4C] transition-shadow ${
      noMargin ? "" : "mb-6"
    }`}
  />
);

export default RegisterCompany;