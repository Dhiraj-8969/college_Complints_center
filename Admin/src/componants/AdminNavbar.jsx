import React from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/admin-login");
  };

  return (
    <nav className="text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://bbsbec.edu.in/wp-content/themes/bbsbec/images/logo.png" 
              alt="College Logo"
              className="w-16 p-2 hover:opacity-80 transition-opacity"
            />
            <Link 
              to="/" 
              className="text-xl no-underline text-black font-bold"
            >
              Complaint Manager
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/forget-user-password"
              className="font-medium text-black hover:text-blue-500 transition-colors no-underline"
            >
              Change Student Password
            </Link>
            <button
              onClick={handleLogout}
              className= "px-4 py-2 rounded transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;