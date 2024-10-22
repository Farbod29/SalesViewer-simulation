import React from 'react';
import Header from '../components/Header';
import SessionTable from '../components/SessionTable';
import VerticalSidebar from '../components/MainMenu';
import ChatBotComponent from '../components/ChatBotComponent';

const Home: React.FC = () => {
  // const [chatBotVisible, setChatBotVisible] = useState(true);

  return (
    <div className="flex overflow-hidden relative">
      <VerticalSidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow overflow-hidden pt-5">
          <SessionTable />
        </div>
      </div>
      <ChatBotComponent visible={true} />
    </div>
  );
};

export default Home;
