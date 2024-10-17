import React from 'react';
import Header from '../components/Header'; // Import the header
import SessionTable from '../components/SessionTable'; // Import the session table
import VerticalSidebar from '../components/Hauptmenü'; // Import the sidebar

const Home = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with fixed width */}
      <VerticalSidebar className="w-1/4" />

      {/* Main content with flexible width */}
      <div className="flex flex-col flex-grow">
        <Header className="w-full" />
        <div className="flex-grow overflow-auto p-6">
          <SessionTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
