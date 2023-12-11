// ... (previous code)

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import TextMessage from "./TextMessage.tsx";
import ImageMessage from "./ImageMessage.tsx";
import AudioMessage from "./AudioMessage.tsx";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

interface Message {
  accentColor: string | undefined;
  image: string | undefined;
  type: "text" | "image" | "voice";
  content: string;
  sender: string;
}

interface ChatBubbleProps {
  title: string;
  currentUser: string;
  accentColor: string;
  messages: Message[];
  handleClose: () => boolean;
}

type MessageType = "text" | "image" | "voice" | "custom";

const ChatBubble: React.FC<ChatBubbleProps> = ({ messages, handleClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFileInput(null);
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const file = files[0];
      const newMessage: Message = {
        type: file.type.startsWith("image/") ? "image" : "voice",
        content: URL.createObjectURL(file),
        sender: "CurrentUser",
        image: undefined,
        accentColor: undefined,
      };
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
      setFileInput(null);
    }
    if (fileInput) {
      fileInput.value = "";
      setFileInput(null);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" && !fileInput?.files?.length) {
      return;
    }

    if (fileInput?.files?.length) {
      const file = fileInput.files[0];
      const newMessage: Message = {
        type: file.type.startsWith("image/") ? "image" : "voice",
        content: URL.createObjectURL(file),
        sender: "CurrentUser",
        image: undefined,
        accentColor: undefined,
      };
      setMessageList((prevMessages) => [...prevMessages, newMessage]);

      if (fileInput) {
        fileInput.value = "";
        setFileInput(null);
      }
    }

    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        type: "text",
        content: inputValue,
        sender: "CurrentUser",
        image: undefined,
        accentColor: undefined,
      };
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
    }
    setFileInput(null);
  };

  const chatData = (
    type: MessageType,
    content?: string,
    sender?: string,
    image?: string,
    accentColor?: string
  ): React.ReactNode => {
    const data: Record<MessageType, React.ReactNode> = {
      text: (
        <TextMessage
          title={content || ""}
          sender={sender || ""}
          accentColor={accentColor || ""}
          image={image || ""}
        />
      ),
      image: (
        <ImageMessage
          image={content || ""}
          sender={sender || ""}
          avatar={image || ""}
        />
      ),
      voice: (
        <AudioMessage
          voice={content || ""}
          sender={sender || ""}
          image={image || ""}
        />
      ),
      custom: <div>{content}</div>,
    };

    return data[type] || data.custom;
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div className={`chat-container ${isMobile ? "mobile" : ""}`}>
      <button className="close-message" onClick={handleClose}>
        <IoCloseSharp />
      </button>
      <div ref={chatContainerRef} className="message-scroll ">
        {messageList.map((message, index) => (
          <div className={`message ${message.sender}`} key={index}>
            {chatData(
              message.type,
              message.content,
              message.sender,
              message.image,
              message.accentColor
            )}
          </div>
        ))}
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
        />

        <label className="file-upload-label" htmlFor="upload">
          <MdOutlineFileUpload />
        </label>
        <input
          className="file-upload-input"
          id="upload"
          type="file"
          accept="image/*,audio/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e.target.files)
          }
          ref={(input) => setFileInput(input)}
        />
        <button className="send-message" onClick={handleSendMessage}>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatBubble;
