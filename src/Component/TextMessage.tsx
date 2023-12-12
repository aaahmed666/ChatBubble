import React from "react";
import { useTranslation } from "react-i18next";
import currentUser from "../image/robot-chat-bot-concept-illustration-vector.jpg";

interface Props {
  title: string;
  sender?: string;
  accentColor: string;
  image?: string;
}

const TextMessage: React.FC<Props> = ({
  title,
  sender,
  accentColor,
  image,
}) => {
  const { t } = useTranslation();
  const isCurrentUser = sender === "CurrentUser";
  const senderImage = isCurrentUser ? currentUser : image;

  return (
    <>
      <img src={senderImage} alt="userimage" />
      <div>
        {t(sender)}
        <p
          style={{ color: accentColor ?? "#fff" }}
          className={isCurrentUser ? "title-sender" : "title"}
        >
          {t(title)}
        </p>
      </div>
    </>
  );
};

export default TextMessage;
