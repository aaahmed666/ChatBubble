import React from "react";
interface Props {
  image: string;
  sender?: string;
}

const ImageMessage: React.FC<Props> = ({ image, sender }) => {
  return (
    <>
      <img
        className={sender === "CurrentUser" ? "image-sender" : "image"}
        src={image}
        alt="Profilepicture of the user"
      />
      {sender}
    </>
  );
};

export default ImageMessage;
