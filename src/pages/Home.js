// src/pages/Home.js

import React from 'react';
import Header from '../components/Header'; // Import the Header component
import SessionTable from '../components/SessionTable'; // Import the SessionTable component

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header /> {/* Render the Header component */}
      <div className="container mx-auto mt-6">
        <SessionTable /> Render the SessionTable component
      </div>
    </div>
  );
};

export default Home;
