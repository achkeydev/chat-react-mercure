import React from "react";
import { User } from "../Home/Home";

interface DisplayFriendInfosProps {
    user: User;
    friendId: string | null;
}

const DisplayFriendInfos: React.FC<DisplayFriendInfosProps> = ({user, friendId}) => {
    return(
        <>
        {user.friends.length > 0 &&
            (
                <>
                {user.friends.map(friend => {
                    if(friend._id === friendId){
                        return <h3 className="font-bold text-lg" key={friend._id}>{friend.nom} {friend.prenom}</h3>
                    }
                })}
                </>
            )
            }
        </> 
    )
}

export default DisplayFriendInfos;