import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
  const [companyname, setCompanyname] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [companypassword, setCompanyPassword] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const addCompany = {
      companyname: companyname,
      website: website,
      location: location,
      description: description,
      companypassword: companypassword,
    };
    console.log(addCompany);
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
      console.log(result.error);
    } else {
      // Clear input fields and error message
      setCompanyname("");
      setDescription("");
      setLocation("");
      setWebsite("");
      setCompanyPassword("");
      navigate("/company"); // Navigate to home after successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-100 p-10">
      <form
        onSubmit={handleCreate}
        className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Company
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="companyname"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyname"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your company name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="website">
            Website
          </label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your website"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your location"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="Discription"
          >
            Discription
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter your discription"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="companypassword"
          >
            Company Password
          </label>
          <input
            type="password"
            id="companypassword"
            value={companypassword}
            onChange={(e) => setCompanyPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00A263]"
            placeholder="Enter password for company"
          />
        </div>

        <button
          type="submit"
          className="w-full px-8 bg-[#00A263] text-white font-bold py-3 rounded hover:bg-green-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;
