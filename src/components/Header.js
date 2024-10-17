import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

import profilePicture from '../assents/images/profilePicture.jpeg';

const Header = () => {
  return (
    <div className="bg-gray-50 shadow flex items-center justify-between p-5">
      {/* Left section with logo and text */}
      <div className="flex items-center">
        {/* <div className="text-gray-500 text-sm">Session Viewer</div> */}
      </div>

      {/* Center section with search bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
        </div>
      </div>

      {/* Right section with URL, date, and user profile */}
      <div className="flex items-center space-x-6">
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
