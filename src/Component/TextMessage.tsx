import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  sender?: string;
  user1: string;
  user2: string;
  currentUser: string;
  accentColor: string;
}

const TextMessage: React.FC<Props> = ({
  title,
  sender,
  user1,
  user2,
  currentUser,
  accentColor,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <img
        src={
          sender === "user1" ? user1 : sender === "user2" ? user2 : currentUser
        }
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
