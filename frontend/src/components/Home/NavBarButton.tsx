import React from "react";

interface NavBarButtonProps {
    buttonFunction: () => void;
    buttonName:string
}

const NavBarButton: React.FC<NavBarButtonProps> = ({buttonFunction, buttonName}) => {
    return(
        <button className="h-8 pl-4 pr-4 rounded-md hover:bg-indigo-800 text-white" onClick={buttonFunction}>{buttonName}</button>
    )
}

export default NavBarButton;