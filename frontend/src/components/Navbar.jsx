import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login session
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-green-900 to-emerald-800 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex space-x-6">
        <Link to="/home" className="hover:text-yellow-300 transition-colors">Home</Link>
        <Link to="/chatbot" className="hover:text-yellow-300 transition-colors">Chatbot</Link>
        <Link to="/Weather & Alerts" className="hover:text-yellow-300 transition-colors">Weather & Alerts</Link>
        <Link to="/Water Management" className="hover:text-yellow-300 transition-colors">Water Management</Link>
        <Link to="/cropdoctor" className="hover:text-yellow-300 transition-colors">Crop Doctor</Link>
        <Link to="/disease-detection" className="hover:text-yellow-300 transition-colors">Disease Detection</Link>
        <Link to="/women" className="hover:text-yellow-300 transition-colors">Women</Link>
        <Link to="/kisaan-seva" className="hover:text-yellow-300 transition-colors">Kisaan Seva</Link>
        <Link to="/marketprice" className="hover:text-yellow-300 transition-colors">Market Price</Link>
      
        <Link to="/agrisupport" className="hover:text-yellow-300 transition-colors">Agri Support</Link>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
