import React from "react";

interface AddJoinButtonProps {
    buttonFunction: (userId: string) => void;
    Id: string;
    buttonName : string;
}

const AddJoinButton: React.FC<AddJoinButtonProps> = ({buttonFunction, Id, buttonName}) => {
    return(
        <button className="pl-3 pr-3 h-6 rounded-md bg-indigo-400 hover:bg-indigo-300 text-white text-sm" onClick={()=> buttonFunction(Id)}>{buttonName}</button>
    )
};

export default AddJoinButton; 