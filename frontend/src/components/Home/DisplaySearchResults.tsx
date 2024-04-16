import React from "react";
import { User, Group } from "./Home";
import AddJoinContactButton from "./AddJoinContactButton";

interface DisplaySearchResultsProps {
    addFriend: (userId: string) => void;
    joinGroup: (notAddedGroupId: string) => void;
    displayFriends: User[];
    displayUsers: User[];
    displayAddedGroups: Group[];
    displayNotAddedGroups: Group[];
    searchMessage: string;
}

const DisplaySearchResults: React.FC<DisplaySearchResultsProps> = ({displayFriends, displayUsers, addFriend, displayNotAddedGroups, displayAddedGroups, joinGroup, searchMessage}) => {
    return(
        <div>
          {((displayUsers.length > 0) || (displayFriends.length > 0) || (displayAddedGroups.length > 0) || (displayNotAddedGroups.length > 0)) ? (
          <div className="bg-indigo-950 p-4 text-white h-80 overflow-auto space-y-4 rounded-lg">
          {displayUsers.map(user => (
            user && (
              <div key={user._id}>
                <p>{user.nom} {user.prenom}</p>
                <AddJoinContactButton Id={user._id} buttonFunction = {addFriend} buttonName="Ajouter"></AddJoinContactButton>
              </div>
            )
          ))}
          {displayFriends.map(userFriend => (
            userFriend && (
            <div key={userFriend._id}>
              <p>{userFriend.nom} {userFriend.prenom}</p>
              <h6>Ami(e)</h6>
            </div>
            )
          ))}
          {displayNotAddedGroups.map((notAddedGroup: Group) => (
            notAddedGroup && (
              <div key={notAddedGroup._id}>
                <p>{notAddedGroup.groupName}</p>
                <AddJoinContactButton Id={notAddedGroup._id} buttonFunction = {joinGroup} buttonName="Adhérer"></AddJoinContactButton>
              </div>
            )
          ))}
          {displayAddedGroups.map((addedGroup: Group) => (
            addedGroup && (
            <div key={addedGroup._id}>
              <p>{addedGroup.groupName}</p>
              <h6>Déjà membre</h6>
            </div>
            )
          ))}
          </div>
          )
          :
          (searchMessage &&
            <p className='flex justify-center pt-20 text-lg bg-indigo-950 p-4 text-white h-80 overflow-auto space-y-4 rounded-md'>{searchMessage}</p>
          )}
        </div>
    ) 
}

export default DisplaySearchResults;