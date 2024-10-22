import React, { useState } from 'react';
import Header from '../components/Header';
import SessionTable from '../components/SessionTable';
import VerticalSidebar from '../components/MainMenu';
import ChatBotComponent from '../components/ChatBotComponent';
import { MessageCircle } from 'lucide-react';

const Home = () => {
  const [chatBotVisible, setChatBotVisible] = useState(true);

  const toggleChatBot = () => {
    setChatBotVisible(!chatBotVisible);
  };

  return (
    <div className="flex overflow-hidden relative">
      {/* Fixed Sidebar */}
      <VerticalSidebar className="sidebar" />

      {/* Main content with flexible width */}
      <div className="flex flex-col flex-grow">
        {/* Fixed Header */}
        <Header />
        <div className="flex-grow overflow-hidden pt-5">
          <SessionTable />
        </div>
      </div>

      {/* ChatBot Button */}
      {/* <button
        onClick={toggleChatBot}
        className="fixed bottom-6 left-6 z-50 bg-[#001f3f] text-white p-4 rounded-full shadow-lg hover:bg-[#003366] transition-colors duration-200 flex items-center justify-center"
        aria-label="Toggle chat bot"
      >
        <MessageCircle className="w-6 h-6" />
      </button> */}

      {/* ChatBot Component */}
      <ChatBotComponent visible={chatBotVisible} />
    </div>
  );
};

export default Home;
