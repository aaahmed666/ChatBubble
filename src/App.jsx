import "./App.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChatBubble from "./Component/ChatBubble.tsx";
import i18next from "./i18n";
import { FaRocketchat } from "react-icons/fa";
import avatar from "./image/istockphoto-1337144146-612x612.jpg";

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
    { type: "text", content: "Hello!", sender: "user1" },
    { type: "text", content: "Hi there!", sender: "user2" },
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
          avatar={avatar}
          accentColor="#3498db"
          messages={mockMessages}
          handleClose={handleClose}
        />
      </div>
    </main>
  );
}

export default App;