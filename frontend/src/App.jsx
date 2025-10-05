import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Chatbot from "./pages/ChatBot";
import Calendar from "./pages/Weather & Alerts";
import Water from "./pages/Water Management";
import CropDoctor from "./pages/CropDoctor";
import DiseaseDetection from "./pages/DiseaseDetection";
import Women from "./pages/Women";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KisaanSeva from "./pages/KisaanSeva";
import MarketPrice from "./pages/MarketPrice";
import AgrisupportSystem from "./pages/AgrisupportSystem"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    const handleAuthChange = () => {
      const updatedStatus = !!localStorage.getItem("isLoggedIn");
      console.log("Auth status updated to:", updatedStatus);
      setIsLoggedIn(updatedStatus);
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("login", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("login", handleAuthChange);
    };
  }, []);

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/home" /> : <Register />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/chatbot" element={isLoggedIn ? <Chatbot /> : <Navigate to="/login" />} />
        <Route path="/Weather & Alerts" element={isLoggedIn ? <Calendar /> : <Navigate to="/login" />} />
        <Route path="/Water Management" element={isLoggedIn ? <Water /> : <Navigate to="/login" />} />
        <Route path="/cropdoctor" element={isLoggedIn ? <CropDoctor /> : <Navigate to="/login" />} />
        <Route path="/disease-detection" element={isLoggedIn ? <DiseaseDetection /> : <Navigate to="/login" />} />
        <Route path="/women" element={isLoggedIn ? <Women /> : <Navigate to="/login" />} />
        <Route path="/kisaan-seva" element={isLoggedIn ? <KisaanSeva /> : <Navigate to="/login" />} />
        <Route path="/marketprice" element={isLoggedIn ? <MarketPrice /> : <Navigate to="/login" />} />
        <Route path="/agrisupport" element={isLoggedIn ? <AgrisupportSystem /> : <Navigate to="/login" />} />
      </Routes>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
