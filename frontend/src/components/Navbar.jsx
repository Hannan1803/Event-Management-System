import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);0

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 shadow-lg  top-0 left-0 w-full z-50 bg-[#D9EAFD]">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* <h1 className="text-2xl p-4"></h1> */}
        <Link to="/">
          <img src="logo.png" alt="Title" className="w-50"/>
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      <ul className={`flex flex-col items-center gap-6 m-4 md:flex-row transition-all duration-300 ease-in-out ${isOpen ? "flex-row" : "hidden md:flex flex-col"}`}>
      
      {user?.role === "organizer" && <li
      className="relative text-lg font-semibold hover:text-blue-600 transition-colors duration-300
      before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300
      hover:before:w-full"
      
      ><Link to="/dashboard">Dashboard</Link></li>}
        
        
        <li className="relative text-lg font-semibold hover:text-blue-600 transition-colors duration-300
                before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300
                hover:before:w-full"><Link to="/events">Home</Link></li>
        {user?.role === "organizer" && <li
        className="relative text-lg font-semibold hover:text-blue-600 transition-colors duration-300
        before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300
        hover:before:w-full"
        ><Link to="/create-event">Organize Events</Link></li>}
        
        {user?.role === "attendee" && <li className="relative text-lg font-semibold hover:text-blue-600 transition-colors duration-300
                before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300
                hover:before:w-full">
          <Link to="/attendedevents">Registered Events</Link>
        </li>}
    
      </ul>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <ul className="flex flex-col md:flex-row items-center gap-4">
          {user ? (
            <>
              <li className="text-lg font-semibold">Hello, {user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="border p-2 bg-red-500 text-white rounded-md hover:bg-red-700 hover:cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="relative text-lg font-semibold hover:text-blue-600 transition-colors duration-300
                before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300
                hover:before:w-full"><Link to="/login">Login</Link></li>
              <li>
                <Link to="/signup" className="border p-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Sign-Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;