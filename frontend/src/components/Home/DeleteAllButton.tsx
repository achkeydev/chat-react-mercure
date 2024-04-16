import React from "react";

interface DeleteAllButtonProps {
    buttonFunction: () => void;
    buttonName: string
}

const DeleteAllButton: React.FC<DeleteAllButtonProps> = ({buttonFunction, buttonName}) => {
    return(
        <button className="pl-3 pr-3 h-7 rounded-md bg-red-700 hover:bg-red-600 text-white text-sm" onClick={buttonFunction}>{buttonName}</button>
    )
}

export default DeleteAllButton;