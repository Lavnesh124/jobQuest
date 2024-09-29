import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#00A263] text-white h-36 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="font-bold text-lg">WorkBridge</h2>
          <p className="mt-2">Connecting talent with opportunity.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex justify-center md:justify-end space-x-4">
            <li>
              <a href="/about" className="hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>
          &copy; {new Date().getFullYear()} WorkBridge. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
