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

  return (
    <>
      <img
        src={sender == "CurrentUser" ? currentUser : avatar}
        alt="userimage"
      />
      <img
        className={sender === "CurrentUser" ? "image-sender" : "image"}
        src={image}
        alt="Profilepicture of the user"
      />
      {t(sender)}
    </>
  );
};

export default ImageMessage;
