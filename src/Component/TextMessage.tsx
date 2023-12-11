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

  return (
    <>
      <img
        src={sender == "CurrentUser" ? currentUser : image}
        alt="userimage"
      />
      <div>
        {t(sender)}
        <p
          style={{ color: accentColor ?? "#fff" }}
          className={sender === "CurrentUser" ? "title-sender" : "title"}
        >
          {t(title)}
        </p>
      </div>
    </>
  );
};

export default TextMessage;
