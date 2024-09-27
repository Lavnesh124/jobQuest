import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-full h-16 bg-[#00A263] text-white flex justify-between items-center px-4 md:px-8 lg:px-16 sticky top-0">
      <div className="flex items-center font-semibold">
        <NavLink to={"/"}>
          <h2 className="text-lg">WorkBridge</h2>
        </NavLink>
      </div>
      <div className="hidden md:flex justify-between gap-8">
        <NavLink to="/" className="hover:text-gray-300">
          Home
        </NavLink>
        <NavLink to="/jobs" className="hover:text-gray-300">
          Jobs
        </NavLink>
        <NavLink to="/browse" className="hover:text-gray-300">
          Browse
        </NavLink>
      </div>
      <div className="flex items-center relative">
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-8 h-8 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <button
          className="p-2"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <img
            className="rounded-md"
            width={35}
            height={35}
            src="https://imgs.search.brave.com/EcbeGlqXlo-1UsUTCdkF0yVSwJa2x_xL3p66MTvzPns/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtZ2xvYmFsLndl/YnNpdGUtZmlsZXMu/Y29tLzVlYzdkYWQy/ZTZmNjI5NWE5ZTJh/MjNkZC81ZWRmYTdj/NmY5NzhlNzUzNzJk/YzMzMmVfcHJvZmls/ZXBob3RvMS5qcGVn"
            alt="Profile"
          />
        </button>
        {isProfileOpen && (
          <div className="absolute top-10 right-2 mt-2 w-40 bg-gray-100 text-black rounded-md shadow-2xl z-10 mx-auto">
            <NavLink
              to="/profile"
              className="flex items-center px-4 py-2 hover:bg-gray-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v2h20v-2c0-3.33-6.69-5-10-5z" />
              </svg>
              View Profile
            </NavLink>
            <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#00A263] p-4 md:hidden">
          <NavLink to="/" className="block py-2 hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to="/jobs" className="block py-2 hover:text-gray-300">
            Jobs
          </NavLink>
          <NavLink to="/browse" className="block py-2 hover:text-gray-300">
            Browse
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
