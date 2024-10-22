import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { FaShoppingBasket } from 'react-icons/fa';

// Define the theme for the chatbot
const theme = {
  background: '#fff',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#001f3f',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#001f3f',
  botFontColor: '#fff',
  userBubbleColor: '#4a4a4a',
  userFontColor: '#fff',
};

// Custom component for company list
const CompanyList = () => (
  <div className="space-y-4">
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
      <strong>Reinholz Technologies GmbH</strong>
      <a
        href="https://www.allaboutautomation.de/de/exhibitor/reinholz-technologies-gmbh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://easyfairsassets.com/sites/266/2023/09/RT-Logo_1024x576.png"
          alt="Reinholz Technologies Logo"
          className="max-w-[200px] my-2"
        />
      </a>
      <div>Current basket value: 750 €</div>
      <a href="tel:+49123456789">Phone: +49 123 456 789</a>
    </div>
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
      <strong>TLX Sped</strong>
      <a href="https://tlx-sped.com/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://tlx-sped.com/images/logo-TLX_transp.png"
          alt="TLX Sped Logo"
          className="max-w-[200px] my-2"
        />
      </a>
      <div>Price: 850 €</div>
      <a href="tel:+49987654321">Phone: +49 987 654 321</a>
    </div>
  </div>
);

// Custom component for API-based chat
const ApiChat = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleUserInput = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant for the Sales Viewer application.',
            },
            {
              role: 'user',
              content: userInput,
            },
          ],
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setResponse(
        'I apologize, but I encountered an error. Please try again later.'
      );
    }
    setLoading(false);
    setUserInput(''); // Clear input field after sending
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleUserInput}
        disabled={loading}
        className="mt-2 bg-[#001f3f] text-white px-4 py-2 rounded"
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

// Define the steps for the chatbot
const steps = [
  {
    id: 'greeting',
    message:
      'Dear Sales Viewer user, do you want to see the 2 recent companies that wanted to purchase your application but just left the procedure at the end?',
    trigger: 'user-response',
    delay: 1000,
  },
  {
    id: 'user-response',
    options: [
      {
        value: 'yes lets see!',
        label: 'Yes lets see!',
        trigger: 'show-companies',
      },
      { value: 'Not now', label: 'Not now', trigger: 'ask-for-help' },
    ],
  },
  {
    id: 'show-companies',
    message: 'Here are the companies that showed interest:',
    trigger: 'company-list',
    delay: 1000,
  },
  {
    id: 'company-list',
    message: 'Click on the company name or image to view more:',
    trigger: 'company-links',
    delay: 1000,
  },
  {
    id: 'company-links',
    component: <CompanyList />,
    trigger: 'ask-for-help',
  },
  {
    id: 'ask-for-help',
    message: 'Would you like to ask me anything else about Sales Viewer?',
    trigger: 'help-options',
  },
  {
    id: 'help-options',
    options: [
      { value: 'yes', label: 'Yes, I have questions', trigger: 'api-chat' },
      { value: 'no', label: 'No, thanks', trigger: 'goodbye' },
    ],
  },
  {
    id: 'api-chat',
    component: <ApiChat />,
    waitAction: true,
    trigger: 'goodbye',
  },
  {
    id: 'goodbye',
    message:
      'Thank you for using Sales Viewer! Feel free to come back if you need anything else.',
    end: true,
  },
];

const ChatBotComponent = ({ visible }) => {
  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          botBubbleStyle={{ textAlign: 'left' }}
          userBubbleStyle={{ textAlign: 'left' }}
          floating={true}
          headerTitle="Sales Viewer Assistant"
        />
      </ThemeProvider>
    </div>
  );
};

export default ChatBotComponent;
