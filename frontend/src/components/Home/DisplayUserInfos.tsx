import React from "react";
import { User } from "./Home";

interface DisplayUserInfosProps {
    user: User;
}

const DisplayUserInfos: React.FC<DisplayUserInfosProps> = ({user}) => {
    return(
        <h2 className="font-bold text-lg">{user.nom} {user.prenom}</h2>
    )
}

export default DisplayUserInfos;