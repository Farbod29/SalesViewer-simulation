import React from 'react';
import Header from '../components/Header'; // Import the header
import SessionTable from '../components/SessionTable'; // Import the session table
import VerticalSidebar from '../components/MainMenu'; // Import the sidebar

const Home = () => {
  return (
    <div className="flex overflow-hidden">
      {/* Fixed Sidebar */}
      <VerticalSidebar className="sidebar" />

      {/* Main content with flexible width */}
      <div className=" flex flex-col flex-grow">
        {/* Fixed Header */}
        <Header />
        <div className="flex-grow overflow-hidden p-6">
          <SessionTable />
        </div>
      </div>
    </div>
  );
};

export default Home;