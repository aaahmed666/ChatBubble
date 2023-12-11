import "./App.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChatBubble from "./Component/ChatBubble.tsx";
import i18next from "./i18n";
import { FaRocketchat } from "react-icons/fa";
import user1 from "./image/istockphoto-1337144146-612x612.jpg";
import user2 from "./image/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png";
import currentUser from "./image/robot-chat-bot-concept-illustration-vector.jpg";
import voice from "./sound/Facebook-Notification.mp3";

function App() {
  const [t, i18n] = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    document.body.dir = i18n.dir();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mockMessages = [
    { type: "text", content: "Hello", sender: "user1", image: user1 },
    { type: "text", content: "Hi there", sender: "user2", image: user2 },
    { type: "voice", content: voice, sender: "user2" },
    { type: "image", content: currentUser, sender: "user1" },
  ];

  return (
    <main>
      <div className="navbar">
        <ul>
          {i18n.language === "en" && (
            <Button
              variant="dark"
              onClick={() => {
                changeLng("ar");
              }}
            >
              العربية
            </Button>
          )}
          {i18n.language === "ar" && (
            <Button
              variant="dark"
              onClick={() => {
                changeLng("en");
              }}
            >
              English
            </Button>
          )}
        </ul>
      </div>
      <button className="chatBubble-circle" onClick={handleShow}>
        <FaRocketchat />
      </button>
      <div className="app">
        <ChatBubble
          title="Chat Bubble"
          currentUser={currentUser}
          accentColor="#6ea4c8"
          messages={mockMessages}
          handleClose={handleClose}
        />
      </div>
    </main>
  );
}

export default App;
