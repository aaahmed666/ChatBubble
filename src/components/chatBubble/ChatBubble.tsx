import React, { MouseEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Chats from "../Chats/Chats.tsx";
import "./ChatBubble.scss";
import sound from "../../sound/Facebook-Notification.mp3";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}

// Props interface with the function prop
interface props {
  handleClose: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ChatBubble: React.FC<props> = (props) => {
  const [t, i18n] = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot",
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");
  const [imageSender, setImageSender] = useState<File | string>("");

  const analyzeNextSteps = (step: number, user: string) => {
    return step === 0
      ? {
          purpose: "specify field",
          message: `jobs`,
          options: ["Frontend", "Backend", "Full Stack"],
        }
      : step === 1
      ? {
          purpose: "specify experience",
          message: "field",
          sound: sound,
        }
      : step === 2
      ? {
          purpose: "specify projects",
          message: "project",
        }
      : step === 3
      ? {
          purpose: "specify personality",
          message: "thanks",
        }
      : step === 4
      ? {
          purpose: "prompt company info",
          message: "explain",
          options: ["Yeah sure", "pass"],
        }
      : step === 5
      ? user === "Yeah sure"
        ? {
            purpose: "tell company info",
            message: "what_we_do",
            options: ["Keep going"],
          }
        : {
            purpose: "not tell company info",
            message: "guess",
            options: ["Keep going"],
          }
      : step === 6
      ? {
          purpose: "specify reason to work",
          message: "what_we_do_now",
        }
      : step === 7
      ? {
          purpose: "specify hobbies",
          message: "Alright",
        }
      : step === 8
      ? {
          purpose: "specify email",
          message: "sound",
        }
      : step === 9
      ? {
          purpose: "end",
          message: "soon",
        }
      : {
          purpose: "bye",
          message: "bye",
        };
  };

  // setting next step when there's response and option click
  const setNextStep = (response: string) => {
    setStep((prevState) => prevState + 1);
    setSendUserResponse(response);
    setImageSender(response);
    let res = analyzeNextSteps(step, response);
    setBotResponse({ ...res, sender: "bot" });
    setImageSender("");
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };

  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setImageSender(evt.target.files[0]);
    }
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check and add event listener
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div className={`chat-container ${isMobile ? "mobile" : ""}`}>
      <div className="close-button">
        <button className="close-message" onClick={props.handleClose}>
          x
        </button>
      </div>
      <Chats
        userResponse={userResponse}
        botResponse={botResponse}
        sendUserResponse={sendUserResponse}
        imageSender={imageSender}
        optionClick={optionClick}
      />

      <form onSubmit={(e) => handleSubmit(e)} className="form-container">
        <input
          onChange={(e) => handleInputChange(e)}
          value={userResponse}
        ></input>
        <label className="file-upload-label" htmlFor="upload">
          <MdOutlineFileUpload />
        </label>

        <input
          className={"file-upload-input"}
          id="upload"
          type="file"
          accept="image/*"
          onChange={changeHandler}
        />

        <button className="send-message">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatBubble;
