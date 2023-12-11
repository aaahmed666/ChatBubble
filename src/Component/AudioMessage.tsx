import React from "react";
interface Props {
  voice: string;
  sender?: string;
}

const ImageMessage: React.FC<Props> = ({ voice, sender }) => {
  return (
    <>
      <audio
        className={sender === "CurrentUser" ? "voice-sender" : "voice"}
        controls
      >
        <source src={voice} type="audio/mp3" />
      </audio>
      {sender}
    </>
  );
};

export default ImageMessage;
