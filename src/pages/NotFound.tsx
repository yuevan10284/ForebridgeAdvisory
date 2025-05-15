
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found - 30under30.ai";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-white py-24">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            This page doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="bg-black text-white px-6 py-3 text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
