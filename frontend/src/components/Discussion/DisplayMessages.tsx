import React, {useEffect, useRef} from "react";
import { User } from "../Home/Home";
import { MessageData } from "./Discussion";

interface DisplayMessagesProps {
    user: User;
    friendId: string | null;
    Messages: MessageData[];
    deleteMessage: string;
}

const DisplayMessages: React.FC<DisplayMessagesProps> = ({ user, friendId, Messages, deleteMessage }) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [Messages]);
    return (
      <div ref={messagesContainerRef} className="flex flex-col space-y-2 mx-10 flex-1 overflow-auto" style={{ scrollBehavior: "smooth" }}>
        {(Messages.length > 0) && (!deleteMessage) ? (
          <>
            {Messages.map((Message: MessageData) => (
              <div key={Message._id} className={`flex ${Message.sender._id === user._id ? "ml-auto mt-auto" : "mr-auto mt-auto"}`}>
                <p className="rounded-full p-2 px-8 text-white text-lg" style={{backgroundColor: Message.sender._id === user._id ? "#818cf8" : Message.sender._id === friendId ? "#4f46e5": "",}}>{Message.message}</p>
              </div>
            ))}
          </>
        )
        :
        (
          <p className="flex justify-center pt-64 text-lg">{deleteMessage}</p>
        )} 
      </div>
    );
  };
  
  export default DisplayMessages;
  