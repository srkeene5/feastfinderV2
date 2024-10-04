import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Link for internal navigation

// Simple rule-based responses
const responses = {
  'help with an order': {
    text: 'Which service are you using? DoorDash, Uber Eats, or GrubHub?',
    nextStep: 'order_service'
  },
  'help with my account': {
    text: 'You can manage your account settings here:',
    internalLink: '/AccountPage' // Internal link to AccountPage
  },
  'doordash': {
    text: 'You can get help with your DoorDash order here:',
    link: 'https://help.doordash.com/consumers/s/consumer-support?language=en_US'
  },
  'uber eats': {
    text: 'You can get help with your Uber Eats order here:',
    link: 'https://help.uber.com/en/ubereats/restaurants'
  },
  'grubhub': {
    text: 'You can get help with GrubHub here:',
    link: 'https://about.grubhub.com/media/contact-us/'
  },
  'login': {
    text: 'You can reset your login or password on the account recovery page.',
    link: 'https://your-login-reset-page-url.com' // Replace with actual reset URL
  },
  'talk to human support': {
    text: 'Please contact our support team at support@company.com or call 1-800-123-4567.'
  }
};

// ChatPopup component
const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<{ text: string; link?: string; internalLink?: string }>({
    text: "Hello! How can I help you today? You can say 'help with an order', 'help with my account', or 'talk to human support'."
  }); // Initial prompt
  const [nextStep, setNextStep] = useState<string | null>(null);

  // Function to reset the chat when it closes and reopens
  const resetChat = () => {
    setResponse({
      text: "Hello! How can I help you today? You can say 'help with an order', 'help with my account', or 'talk to human support'."
    });
    setNextStep(null);
    setQuery(''); // Clear the input field
  };

  // Toggle popup open/close, reset chat when closing
  const togglePopup = () => {
    if (isOpen) {
      resetChat(); // Reset the chat when the popup is closed
    }
    setIsOpen(!isOpen);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const lowerCaseQuery = query.toLowerCase();

    // "Talk to human support" can be triggered at any time
    if (lowerCaseQuery.includes('talk to human support')) {
      setResponse(responses['talk to human support']);
      setQuery(''); // Clear the input
      return;
    }

    // If there's a current step (e.g., user has already selected something like 'order_service')
    if (nextStep) {
      if (
        nextStep === 'order_service' &&
        (lowerCaseQuery === 'doordash' || lowerCaseQuery === 'uber eats' || lowerCaseQuery === 'grubhub')
      ) {
        setResponse(responses[lowerCaseQuery]);
        setNextStep(null);  // Reset after handling the follow-up step
      } else {
        setResponse({ text: 'Sorry, I didn’t recognize that. Please try again.' });
      }
    } else {
      // Handle the initial query
      const replyData = responses[lowerCaseQuery];
      if (replyData) {
        setResponse(replyData);
        setNextStep(replyData.nextStep || null);  // If there’s a next step, track it
      } else {
        setResponse({ text: "Sorry, I couldn't understand you. Please try: 'help with an order', 'help with my account', or 'talk to human support'" });
      }
    }

    setQuery('');  // Clear the input field after submission
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <div className="chat-button" onClick={togglePopup}>
        {isOpen ? "Close Chat" : "Chat with us"}
      </div>

      {/* Popup Chat Window */}
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-response">
            <p>{response.text}</p>
            {response.link && (
              <a href={response.link} target="_blank" rel="noopener noreferrer">
                Click here for more details
              </a>
            )}
            {response.internalLink && (
              <Link to={response.internalLink}>
                Go to Account Settings
              </Link>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Type your message here..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
