import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  image: string;
  sender?: string;
}

const ImageMessage: React.FC<Props> = ({ image, sender }) => {
  const { t } = useTranslation();

  return (
    <>
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
