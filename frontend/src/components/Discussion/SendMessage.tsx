import React from "react";

interface SendMessageProps {
    sendMessage: (e: React.FormEvent) => void;
    message: string;
    setMessage: (message: string) => void;
}

const SendMessage: React.FC<SendMessageProps> = ({sendMessage, message, setMessage}) => {
    return(
        <form onSubmit={(e) => {e.preventDefault(); message.trim() !== '' && sendMessage(e)}} className="flex p-5 mx-2">
            <input type="text" className='grow mr-2 h-11 pl-5 rounded-full border-0 ring-1 ring-inset ring-gray-300 text-sm' placeholder="Ecrivez votre message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
            <input type="submit" className="pl-4 pr-4 h-11 rounded-full bg-indigo-400 hover:bg-indigo-300 text-white text-base" value="Envoyer" />
        </form>
    )
}

export default SendMessage;