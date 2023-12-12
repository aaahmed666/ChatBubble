import React from "react";
import { useTranslation } from "react-i18next";
import currentUser from "../image/robot-chat-bot-concept-illustration-vector.jpg";
interface Props {
  voice: string;
  sender?: string;
  image?: string;
}

const ImageMessage: React.FC<Props> = ({ voice, sender, image }) => {
  const { t } = useTranslation();
  const isCurrentUser = sender === "CurrentUser";
  const senderImage = isCurrentUser ? currentUser : image;

  return (
    <>
      <img src={senderImage} alt="userimage" />
      <audio className={isCurrentUser ? "voice-sender" : "voice"} controls>
        <source src={voice} type="audio/mp3" />
      </audio>
      {t(sender)}
    </>
  );
};

export default ImageMessage;
