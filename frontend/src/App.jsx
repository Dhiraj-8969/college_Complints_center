import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Home from "./components/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

