import React from "react";
import bot from "../image/robot-chat-bot-concept-illustration-vector.jpg";
import user from "../image/istockphoto-1337144146-612x612.jpg";
import user2 from "../image/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png";

interface Props {
  title: string;
  sender?: string;
}

const TextMessage: React.FC<Props> = ({ title, sender }) => {
  return (
    <>
      <img
        src={sender === "user2" ? user2 : sender === "user2" ? user : bot}
        alt="userimage"
      />
      <div>
        {sender}
        <p className={sender === "CurrentUser" ? "title-sender" : "title"}>
          {title}
        </p>
      </div>
    </>
  );
};

export default TextMessage;
