import React from "react";

interface DeleteButtonProps {
    buttonFunction: (friendId: string) => void;
    Id: string
    buttonName: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({Id, buttonFunction, buttonName}) => {
    return(
        <button className="pl-3 pr-3 h-6 rounded-md bg-red-700 hover:bg-red-600 text-white text-sm" key={`delete-friend-${Id}`} onClick={() => buttonFunction(Id)}>{buttonName}</button>
    )
}

export default DeleteButton; 