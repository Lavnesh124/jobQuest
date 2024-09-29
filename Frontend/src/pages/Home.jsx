import React, { useRef, useEffect, useState } from "react";

const HomePage = () => {
  const sliderRef = useRef(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const jobPosts = [
    "FrontEnd Developer",
    "Backend Developer",
    "Data Analyst",
    "Full Stack Developer",
    "UX/UI Designer",
    "DevOps Engineer",
    "Mobile Developer",
    "AI Engineer",
  ];

  const techCompanies = [
    "https://pngimg.com/uploads/google/small/google_PNG19630.png", // Google
    "https://pngimg.com/uploads/microsoft/small/microsoft_PNG16.png", // Microsoft
    "https://pngimg.com/uploads/amazon/amazon_PNG3.png", // Amazon
    "https://pngimg.com/uploads/netflix/small/netflix_PNG15.png", // Netflix
    "https://pngimg.com/uploads/meta/small/meta_PNG5.png", // Meta (Facebook)
  ];

  const testimonials = [
    {
      name: "John Doe",
      feedback: "This platform helped me land my dream job in tech!",
      position: "Software Engineer at Google",
    },
    {
      name: "Jane Smith",
      feedback: "I found so many amazing opportunities here. Highly recommend!",
      position: "Data Scientist at Amazon",
    },
    {
      name: "Mike Johnson",
      feedback: "A great place to connect with top companies.",
      position: "Full Stack Developer at Netflix",
    },
  ];

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -280,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 280,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setIsLeftDisabled(scrollLeft === 0);
    setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - 16);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Main Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-13rem)] bg-gray-50 px-4">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center text-gray-800 tracking-wide leading-tight">
          <span className="text-[#00A263]">Search</span>,{" "}
          <span className="text-gray-700">Apply & </span>{" "}
          <br className="hidden sm:block" />
          Get Your <span className="text-[#00A263]">Dream Jobs</span>
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-lg sm:max-w-xl mb-6">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#00A263] text-base sm:text-lg shadow-md"
              placeholder="Search for jobs..."
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00A263] text-white font-bold p-2 sm:p-3 rounded-full hover:bg-green-600 transition duration-200 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.1-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Job Post Slider */}
        <div className="w-full max-w-lg sm:max-w-xl relative mb-6">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            disabled={isLeftDisabled}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00A263] text-white rounded-full p-2 hover:bg-green-600 transition duration-200 shadow-lg z-10 ${
              isLeftDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex space-x-6 overflow-x-auto w-[80%] mx-auto scrollbar-hide scroll-smooth px-8"
          >
            {jobPosts.map((job, index) => (
              <button
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 px-6 py-2 bg-[#00A263] text-white font-semibold rounded-full hover:bg-green-600 transition duration-200 shadow-lg"
              >
                {job}
              </button>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            disabled={isRightDisabled}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00A263] text-white rounded-full p-2 hover:bg-green-600 transition duration-200 shadow-lg z-10 ${
              isRightDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Get Hired Section */}
      <div className="h-auto bg-gray-100 py-8 mb-6">
        <span className="text-4xl font-bold tracking-wide text-center block mb-4">
          Get Hired Now In Your Dream Companies
        </span>
        <p className="text-lg text-gray-600 text-center mb-4">
          Explore exciting opportunities with leading tech companies and take
          your career to the next level!
        </p>
      </div>

      {/* Tech Companies Logos */}
      <div className="overflow-hidden relative h-28 mb-6">
        <div className="flex w-full justify-around items-center absolute top-1/2 ">
          {techCompanies.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Tech Company Logo ${index + 1}`}
              className="h-7 md:h-11 transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
      </div>
      <hr />

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-12 mb-6 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Say
        </h2>
        <div className="max-w-80 md:max-w-3xl mx-auto space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
              <p className="mt-4 font-semibold">{testimonial.name}</p>
              <p className="text-gray-500">{testimonial.position}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white py-12 text-center w-full">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-8">
          Our Impact
        </h2>
        <div className="flex justify-around max-w-sm md:max-w-full mx-auto gap-2 md:space-x-6 ">
          <div className="bg-gray-100 p-2  md:p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#00A263]">10,000+</h3>
            <p className="text-gray-600">Jobs Listed</p>
          </div>
          <div className="bg-gray-100 p-2 md:p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#00A263]">500+</h3>
            <p className="text-gray-600">Top Companies</p>
          </div>
          <div className="bg-gray-100 p-2 md:p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#00A263]">25,000+</h3>
            <p className="text-gray-600">Successful Hires</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
