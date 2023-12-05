import "./App.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChatBubble from "./components/chatBubble/ChatBubble.tsx";
import i18next from "./i18n";
import { FaRocketchat } from "react-icons/fa";

function App() {
  const [t, i18n] = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        {show && <ChatBubble handleClose={handleClose} />}
      </div>
    </main>
  );
}

export default App;
