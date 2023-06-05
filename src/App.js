import React, { useState } from 'react';
import './styles.css';
import skypeLogo from './images/skypeLogo.png';
import microsoftLogo from './images/microsoftLogo.jpg';
import Avatar from './images/Avatar.jpeg';
import chat from './images/chat.png';
import call from './images/call.png';
import contact from './images/contact.png';
import notification from './images/notification.png';
import newchat from './images/newchat.png'
import meetnow from './images/meetnow.png'

function EmailPage({ handleNext }) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsValid(true);
      handleNext(email);
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img className="skype-logo" src={skypeLogo} alt="Skype Logo" />
        <img className="microsoft-logo" src={microsoftLogo} alt="Microsoft Logo" />
      </div>
      <div className="heading-one">Sign in</div>
      <div className="heading-two">to continue to Skype</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <div className="heading-three">
          No account? <a href="#">Create one!</a>
        </div>
        <div className="heading-four">
          <a href="#">Sign in with a security key?</a>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

function PasswordPage({ handleSignUp }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleSignUp();
    }, 2000);
  };

  return (
    <div className="container">
      <div className="logo">
        <img className="skype-logo" src={skypeLogo} alt="Skype Logo" />
        <img className="microsoft-logo" src={microsoftLogo} alt="Microsoft Logo" />
      </div>
      <div className="heading-five">Enter password</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className="heading-six">
          <a href="#">Forgot password?</a>
        </div>
        <div className="heading-seven">
          <a href="#">Email code to ha*****@gmail.com</a>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

function MainInterface({ email, userId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [showHiEmoji, setShowHiEmoji] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [contactMessages, setContactMessages] = useState({});

  const handleContactSelection = (contact) => {
    setSelectedContact(contact);
    setShowHiEmoji(false);
    setShowWelcome(true);
    setMessage('');
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setShowHiEmoji(true);
      setShowWelcome(false);

      const updatedMessages = { ...contactMessages };
      if (selectedContact.id in updatedMessages) {
        updatedMessages[selectedContact.id].push(message);
      } else {
        updatedMessages[selectedContact.id] = [message];
      }

      setContactMessages(updatedMessages);

      setMessage('');
    }
  };

  const contacts = [
    { name: 'John Doe', id: 0 },
    { name: 'Jane Smith', id: 1 },
    { name: 'Alex Johnson', id: 2 },
  ];

  return (
    <div className="main-interface">
      <div className="left-pane">
        <div className="profile">
          <img className="avatar" src={Avatar} alt="User Avatar" />
          <div className="user-id">{userId}Harris Irfan</div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search contacts by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="icons-section">
          <div className="icon-container">
            <img className="icon" src={chat} alt="Chat Icon" />Chat
          </div>
          <div className="icon-container">
            <img className="icon" src={call} alt="Call Icon" />Call
          </div>
          <div className="icon-container">
            <img className="icon" src={contact} alt="Contacts Icon" />Contacts
          </div>
          <div className="icon-container">
            <img className="icon" src={notification} alt="Notifications Icon" />Notifications
          </div>
        </div>
        <div className='icons-container'>
        <div className="icons-container">
            <img className="icon" src={meetnow} alt="Meet Now Icon" />Meet Now
          </div>
          <div className="icons-container">
            <img className="icon" src={newchat} alt="New Chat Icon" />New Chat
          </div>
        </div>
        <div className="contacts">
          {contacts
            .filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((contact) => (
              <div
                className={`contact ${selectedContact && selectedContact.id === contact.id ? 'active' : ''}`}
                key={contact.id}
                onClick={() => handleContactSelection(contact)}
              >
                {contact.name}
              </div>
            ))}
        </div>
      </div>
      <div className="right-pane">
        {selectedContact ? (
          <div className="chat-section">
            <div className="contact-info">
              <div className="contact-name">{selectedContact.name}</div>
              <div className="contact-id">{selectedContact.id}</div>
            </div>
            {showWelcome && <div className="welcome">Hello!</div>}
            {contactMessages[selectedContact.id] &&
              contactMessages[selectedContact.id].map((msg, index) => (
                <div className="message" key={index}>
                  <div className="content">{msg}</div>
                  {showHiEmoji && <div className="emoji"></div>}
                </div>
              ))}
            <div className="message-input-section">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="no-contact-selected">No contact selected</div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = (email) => {
    setStep(1);
    setEmail(email);
  };

  const handleSignUp = () => {
    setStep(2);
  };

  if (step === 2) {
    return <MainInterface email={email} userId={userId} />;
  } else if (step === 1) {
    return <PasswordPage handleSignUp={handleSignUp} />;
  } else {
    return <EmailPage handleNext={handleNext} />;
  }
}

export default App;
