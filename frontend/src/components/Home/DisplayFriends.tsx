import React from "react";
import { User } from "./Home";
import DeleteButton from "./DeleteButton";
import AddJoinContactButton from "./AddJoinContactButton";

interface DisplayFriendsProps {
    deleteFriend: (friendId: string) => void;
    discussions: (friendId: string) => void;
    user: User;
}

const DisplayFriends: React.FC<DisplayFriendsProps> = ({user, deleteFriend, discussions}) => {
    return(
        <div className="space-y-8">
          <h3 className="flex justify-center text-black text-lg font-bold">Mes amis:</h3>
          {user.friends && user.friends.length > 0 ?
          (
          <div className="border-t">
          {user.friends.map(friend => (
            <div key={friend._id} className="flex border-b px-5 py-3 content-center">
              <p className="mr-auto">{friend.nom} {friend.prenom}</p>
              <div className=" space-x-3">
                  <DeleteButton Id= {friend._id} buttonFunction = {deleteFriend} buttonName="Supprimer"></DeleteButton>
                  <AddJoinContactButton Id={friend._id} buttonFunction={discussions} buttonName="Contacter"></AddJoinContactButton>
              </div>
            </div>
          ))}
          </div>
          )
          :
          <p className="flex p-3 justify-center">Vous n'avez pas encore d'amis</p>
          }
        </div>
    )
}

export default DisplayFriends;