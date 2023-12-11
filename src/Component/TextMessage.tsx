import React from "react";
import bot from "../image/robot-chat-bot-concept-illustration-vector.jpg";
import user from "../image/istockphoto-1337144146-612x612.jpg";
import user2 from "../image/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  sender?: string;
}

const TextMessage: React.FC<Props> = ({ title, sender }) => {
  const { t } = useTranslation();

  return (
    <>
      <img
        src={sender === "user2" ? user2 : sender === "user2" ? user : bot}
        alt="userimage"
      />
      <div>
        {t(sender)}
        <p className={sender === "CurrentUser" ? "title-sender" : "title"}>
          {t(title)}
        </p>
      </div>
    </>
  );
};

export default TextMessage;
