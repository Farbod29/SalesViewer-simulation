import React from 'react';
import SessionTable from '../components/SessionTable';

const Home = () => {
  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Session Overview</h1>
      <SessionTable />
    </div>
  );
};

export default Home;
