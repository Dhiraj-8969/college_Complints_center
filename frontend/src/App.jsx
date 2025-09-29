import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./components/LandingPage";
import LoginStudents from "./components/Auth/LoginStudents";
import SingUpStudent from "./components/Auth/SingUpStudent";
import Complaint from "./components/Complaint";
import Feedback from "./components/Feedback";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Topbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginStudents />} />
        <Route path="/signup" element={<SingUpStudent />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;

