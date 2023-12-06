import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Chats.scss";
import bot from "../../image/robot-chat-bot-concept-illustration-vector.jpg";
import user from "../../image/istockphoto-1337144146-612x612.jpg";
import { BiSolidHandRight } from "react-icons/bi";

interface Props {
  userResponse: string;
  botResponse: {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
    image: string;
  };
  sendUserResponse: string;
  imageSender: string;
  isSelected: boolean;
  selectedFile: string;
  optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
  purpose?: string;
  message: string;
  options?: string[];
  sender: string;
  image?: string;
  sound?: string;
}

const Chats: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessagesInfo[]>([]);
  const dummyRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // stacking up messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          purpose: "introduction",
          message: "Look_job",
          sender: "bot",
        },
      ]);
    } else {
      let tempArray = [...messages];
      tempArray.push({
        message: props.sendUserResponse,
        image: props.imageSender,
        sender: "user",
      });
      setMessages(tempArray);

      setTimeout(() => {
        let temp2 = [...tempArray];
        temp2.push(props.botResponse);
        setMessages(temp2);
      }, 1000);
    }
  }, [props.sendUserResponse, props.botResponse, props.imageSender]);

  // enable autoscroll after each message
  useEffect(() => {
    if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
      bodyRef.current.scrollTo({
        top: dummyRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const ImageThumb = ({ image }) => {
    return image && <img src={URL.createObjectURL(image)} alt={image.name} />;
  };

  return (
    <div className="message-container" ref={bodyRef}>
      {messages.map((chat) => (
        <div key={chat.message}>
          <div className={`message ${chat.sender}`}>
            {chat.sender === "bot" ? (
              <img src={bot} alt="bot" />
            ) : (
              <img src={user} alt="user" />
            )}
            <p>{t(chat.message)}</p>
            {chat?.image && <ImageThumb image={chat?.image} />}
          </div>
          {chat.options ? (
            <div className="options">
              <div>
                <BiSolidHandRight />
              </div>
              {chat?.options?.map((option) => (
                <p
                  onClick={(e) => props.optionClick(e)}
                  data-id={option}
                  key={option}
                >
                  {t(option)}
                </p>
              ))}
            </div>
          ) : null}

          {chat?.sound && (
            <audio controls>
              <source src={chat.sound} type="audio/mp3" />
            </audio>
          )}

          <div ref={dummyRef} className="dummy-div"></div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
