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
      <div className="flex flex-col flex-grow h-screen">
        <Header className="w-full" />
        <div className="flex-grow z-50 p-6 overflow-auto">
          <SessionTable />
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React from 'react';
// import VirtualizedTable from './VirtualizedTable';

// const App = () => {
//   return (
//     <div>
//       <VirtualizedTable />
//     </div>
//   );
// };

// export default App;
