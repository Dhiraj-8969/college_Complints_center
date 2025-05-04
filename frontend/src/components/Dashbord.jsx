import React from "react";
import { Routes, Route } from "react-router-dom";
import Complaint from "./Complaint";
import Feedback from "./Feedback";
import About from "./About";
import Contact from "./Contact";
import LandingPage from "./LandingPage";
import History from "./History";
import Notifications from "./Notifications";
import Profile from "./Profile";
import LoginStudents from "./Auth/LoginStudents";
import SingUpStudent from "./Auth/SingUpStudent";
import ComplaintHistory from "./ComplaintHistory";

function Dashbord() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginStudents />} />
        <Route path="/signup" element={<SingUpStudent />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/history" element={<History />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<ComplaintHistory />} />

      </Routes>

    </div>
  );
}

export default Dashbord;
