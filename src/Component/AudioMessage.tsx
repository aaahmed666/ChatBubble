import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  voice: string;
  sender?: string;
}

const ImageMessage: React.FC<Props> = ({ voice, sender }) => {
  const { t } = useTranslation();

  return (
    <>
      <audio
        className={sender === "CurrentUser" ? "voice-sender" : "voice"}
        controls
      >
        <source src={voice} type="audio/mp3" />
      </audio>
      {t(sender)}
    </>
  );
};

export default ImageMessage;
