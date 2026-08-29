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
import { AuthProvider } from "./context/authContext";
import { SocketProvider } from "./context/socketContext"; // ← add this
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      <AuthProvider>
        <SocketProvider> {/* ← wrap here */}
          <Router>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/loginAdmin" element={<LoginAdmin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registerAdmin" element={<RegisterAdmin />} />
              <Route path="/" element={<Home />} />
              {/* TODO: Re-enable ProtectedRoute when auth is back */}
              <Route path="/jobs" element={<Jobs />} />
              {/* <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            /> */}
              <Route path="/browse" element={<Browse />} />
              <Route path="/chat/:conversationId?" element={<ChatPage />} />
              <Route path="/jobApply/:id" element={<JobApplyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/company/register" element={<RegisterCompany />} />
              <Route path="/company/:id" element={<SingleCompanyPage />} />
              <Route path="/company/role-details/:id" element={<JobOpeningPage />} />
              <Route path="/profile/update" element={<UpdateProfilePage />} />
              <Route path="/jobs/register/:id" element={<JobRegisterPage />} />
            </Routes>
            <Footer />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </>
  );
}

export default App;