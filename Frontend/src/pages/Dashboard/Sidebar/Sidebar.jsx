import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaClipboardList,
} from "react-icons/fa";
import dashlogo from "../../../assets/images/background/dash_logo.webp";
import ProfileImage from "../../../assets/images/cover/edit_profile.webp";
import { Link, useLocation } from "react-router-dom";
import { fetchSidebarUserData } from "../../../Service/Api/api";
import SupportModal from "../Support/Support";


const Sidebar = ({ onClose }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: null,
  });
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const location = useLocation(); 

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleDropdownItemClick = (item) => {
    setActiveDropdownItem(item);
    onClose();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const handleSignOut = () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

      // Directly remove the auth token and user data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during sign out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSidebarUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // const intervalId = setInterval(fetchData, 2000);
    // return () => clearInterval(intervalId);
    fetchData();
  }, []);



  return (
    <div className="w-[260px] h-full bg-[#0B2838] text-white flex flex-col z-50">
      {/* Add Close Button - Only visible on smaller screens */}
      <div className="xl:hidden absolute right-2 top-2 ">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 p-1  "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-center flex-col pt-10 pb-4">
        <img
          src={userData.photo || ProfileImage}
          alt="Profile"
          className="rounded-full object-cover w-[80px] h-[80px] cursor-pointer"
          onClick={toggleModal}
        />
        <p className="pt-3 font-semibold">{userData.firstName} {userData.lastName}</p>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 mt-3">
            <div className="bg-white p-2 rounded-lg shadow-lg w-[500px] max-w-none">
              <div className="flex flex-row items-center gap-1">
                <Link to="/settings/accountDetails" > <img
                  src={userData.photo || ProfileImage}
                  alt="Profile"
                  className="rounded-full object-cover w-[55px] h-[55px]"
                /></Link>
                <div> 
                <p className="text-gray-500 text-[14px] font-bold mt-3 ">Welcome back , </p>
                <p className="pt-1 font-bold text-[#0B2838] text-[14px] ">{userData.firstName} {userData.lastName}</p>
                <div className="pt-1">
                  <p onClick={handleSignOut} className="text-blue-600 text-[14px] font-bold hover:cursor-pointer" >Sign Out</p>
                </div>
                </div>
              </div>
              {/* Close Button */}
              <div className="mt-4 text-center border-t-2 py-1 bg-[#faf8f5] ">
                <button
                  onClick={toggleModal}
                  className="text-blue-600 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <ul className="flex-1 space-y-4 p-4">
        <Link to="/home" onClick={onClose}>
          <li
            className={`flex items-center  p-3 rounded cursor-pointer text-lg font-semibold ${location.pathname === "/home" ? "bg-[#fffaf3] text-[#0B2838]" : ""
              }`}
          >
            <FaHome className="mr-3 text-lg" />
            Home
          </li>
        </Link>

        <Link to="/expenses" onClick={onClose}>
          <li
            className={`flex items-center   p-3 mt-3 rounded cursor-pointer text-lg font-semibold ${location.pathname === "/expenses" ? "bg-[#fffaf3] text-[#0B2838]" : ""
              }`}
          >
            <FaFileInvoiceDollar className="mr-3 text-lg" />
            Expenses
          </li>
        </Link>

        <Link to="/reports" onClick={onClose}>
          <li
            className={`flex items-center p-3 mt-3 rounded cursor-pointer text-lg font-semibold ${
              // Update this line to check for both /reports and /reportdetails
              (location.pathname === "/reports" || location.pathname.includes('/reportdetails'))
                ? "bg-[#fffaf3] text-[#0B2838]"
                : ""
              }`}
          >
            <FaClipboardList className="mr-3 text-lg" />
            Reports
          </li>
        </Link>


        <Link to="/insights" onClick={onClose}>
          <li
            className={`flex items-center  p-3 mt-3 rounded cursor-pointer text-lg font-semibold ${location.pathname === "/insights" ? "bg-[#fffaf3] text-[#0B2838]" : ""
              }`}
          >
            <FaChartBar className="mr-3 text-lg" />
            Insights
          </li>
        </Link>
        {/* Settings with Dropdown */}
        <div>
          <li
            className="flex items-center justify-between  p-3 mt-3 rounded cursor-pointer text-lg font-semibold"
            onClick={toggleSettingsDropdown}
          >
            <div className="flex items-center">
              <FaCog className="mr-3 text-lg" />
              Settings
            </div>
            <span
              className={`transition-transform text-xs ${isSettingsOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </li>
          {isSettingsOpen && (
            <ul className="ml-8 mt-2 space-y-2">
              <Link
                to="/settings/accountDetails"
                onClick={() => handleDropdownItemClick("AccountDetails")}
              >
                <li
                  className={` p-2 text-lg font-semibold rounded cursor-pointer border-l-4 ${location.pathname === "/settings/accountDetails" ? "bg-[#fffaf3] text-[#0B2838] " : "border-white"
                    } pl-3`}
                >
                  Account Details
                </li>
              </Link>
              <Link
                to="/settings/preferences"
                onClick={() => handleDropdownItemClick("Preferences")}
              >
                <li
                  className={` p-2 text-lg font-semibold rounded cursor-pointer border-l-4 ${location.pathname === "/settings/preferences" ? "bg-[#fffaf3] text-[#0B2838] " : "border-white"
                    } pl-3`}
                >
                  Preferences
                </li>
              </Link>
             
            </ul>
          )}
        </div>

        <li
          className="flex items-center p-3 mt-3 rounded cursor-pointer text-lg font-semibold"
          onClick={() => setIsSupportModalOpen(true)}
        >
          <FaQuestionCircle className="mr-3 text-lg" />
          Support
        </li>
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-center p-4">
        <img src={dashlogo} alt="Logo" width={180} height={100} />
      </div>

      {/* Add the Support Modal */}
      {isSupportModalOpen && (
        <SupportModal onClose={() => setIsSupportModalOpen(false)} />
      )}
    </div>
  );
};

export default Sidebar;



