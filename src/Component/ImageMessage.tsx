import React from "react";
import { useTranslation } from "react-i18next";
import currentUser from "../image/robot-chat-bot-concept-illustration-vector.jpg";
interface Props {
  image: string;
  sender?: string;
  avatar?: string;
}

const ImageMessage: React.FC<Props> = ({ image, sender, avatar }) => {
  const { t } = useTranslation();
  const isCurrentUser = sender === "CurrentUser";
  const senderImage = isCurrentUser ? currentUser : avatar;

  return (
    <>
      <img src={senderImage} alt="userimage" />
      <img
        className={isCurrentUser ? "image-sender" : "image"}
        src={image}
        alt="Profilepicture of the user"
      />
      {t(sender)}
    </>
  );
};

export default ImageMessage;
