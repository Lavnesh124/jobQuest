import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobApplyPage from "./pages/JobApplyPage";
import ProfilePage from "./pages/ProfilePage";
import CompanyPage from "./pages/CompanyPage";
import RegisterCompany from "./pages/RegisterCompany";
import SingleCompanyPage from "./pages/SingleCompanyPage";
import JobOpeningPage from "./pages/JobOpeningPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import JobRegisterPage from "./pages/JobRegisterPage";
import LoginAdmin from "./pages/LoginAdmin";
import RegisterAdmin from "./pages/RegisterAdmin";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/jobApply/:id" element={<JobApplyPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/company/register" element={<RegisterCompany />} />
          <Route path="/company/:id" element={<SingleCompanyPage />} />
          <Route path="/role-details" element={<JobOpeningPage />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
          <Route path="/jobs/register" element={<JobRegisterPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
