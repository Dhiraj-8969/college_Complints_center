import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function AdminNavbar() {
  const { logout } = useContext(AppContext)

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
            <NavLink
              to="/"
              className="text-xl no-underline text-black font-bold"
            >
              Complaint Manager
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="/forget-user-password"
              className="font-medium text-black hover:text-blue-500 transition-colors no-underline"
            >
              Change Student Password
            </NavLink>
            <button
              onClick={logout}
              className="px-4 py-2 rounded transition-colors font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;