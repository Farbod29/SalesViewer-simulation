import React from 'react';
import MainLogo from './iconComponents/Mainlogo';
import DashboardIcon from './iconComponents/DashboardIcon';
import UserIcon from './iconComponents/UserIcon';

const VerticalSidebar = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5] border-r-2 border-gray-200">
      {/* Sidebar Logo */}
      <div className="flex justify-center">
        <div className="h-22 w-20 bg-[#141e40] p-3">
          <MainLogo />
        </div>
      </div>
      {/* Centered Icons */}
      <div className="flex flex-col items-center h-full w-full">
        {/* Dashboard Icon with white background */}
        <div className="h-20 w-full flex justify-center items-center">
          <DashboardIcon />
        </div>
        {/* User Icon without white background */}
        <div className="h-20 w-full flex justify-center items-center bg-white">
          <UserIcon />
        </div>
      </div>
      {/* Remaining space (optional for layout adjustment) */}
      <div className="flex-grow"></div>
    </div>
  );
};

export default VerticalSidebar;
