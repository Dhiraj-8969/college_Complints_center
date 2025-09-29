import { Routes, Route } from "react-router-dom";
import AuthAdmin from "./AuthAdmin"
import AuthSignup from "./AuthSignup"
import ForUser from "./ForUser"
import LandingPage from './LandingPage';


function Home() {
  return (
   <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AuthAdmin/>} />
        <Route path="/admin-signup" element={<AuthSignup/>} />
        <Route path='/forget-user-password' element={<ForUser/>} />
   </Routes>
  )
}

export default Home