import React from 'react';
import logo from '../assents/images/salesViewrLogo.png';
import profilePicture from '../assents/images/profilePicture.jpeg';

const Header = () => {
  return (
    <div className="bg-gray-50 p-0 shadow flex items-center justify-between">
      {/* Left section with logo and text */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="h-20 w-20">
          <img
            src={logo}
            alt="SalesViewer Logo"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Session Viewer Text */}
        <div className="text-gray-500 text-sm">Session Viewer</div>
      </div>

      {/* Right section with URL, date, and user profile */}
      <div className="flex items-center space-x-6 pr-8">
        {/* Website URL */}
        <div className="text-sm text-gray-600 flex items-center">
          <span className="text-green-500 text-lg mr-2"> ● </span>
          www.salesviewer-group.com
        </div>

        {/* Date Range */}
        <div className="flex items-center text-sm text-gray-600">
          <span>23.07.2023 - 22.08.2023</span>{' '}
          {/* Static for now, you can replace with a date picker later */}
        </div>
        {/* Profile picture */}
        <div className="h-10 w-10 rounded-full overflow-hidden mr-16">
          <img
            src={profilePicture}
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
