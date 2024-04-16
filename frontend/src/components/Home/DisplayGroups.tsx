import React, { Fragment } from "react";
import { User, Group } from "./Home";
import DeleteButton from "./DeleteButton";

interface DisplayGroupsProps {
    deleteGroup: (groupId: string) => void;
    withdrawGroup: (groupId: string) => void;
    user: User,
    groups: Group[];
    deleteGroupMessage: string;
}

const DisplayGroups: React.FC<DisplayGroupsProps> = ({groups, user, deleteGroup, withdrawGroup, deleteGroupMessage}) => {
    return(
        <div className="space-y-8">
          <h3 className="flex justify-center text-lg font-bold">Mes groupes:</h3>
            <div className="space-y-4">
              <p className="flex justify-center">{deleteGroupMessage}</p>
              {groups.length > 0 ? (
                <div className="space-y-6">
                  {groups.map((group: Group) => (
                    <div key={group._id} className="space-y-2 pl-8 pb-5">
                      <div>
                        <p>{group.groupName}</p>
                        <p>Les membres:</p>
                        {group.admins.length > 0 &&
                          group.admins.map((admin: User) => ( 
                              <Fragment key={`admin-fragment-${admin._id}`}>
                                <p key={admin._id}>{admin.nom} {admin.prenom} (Admin)</p>
                              </Fragment>
                          ))}
                        {group.members.length > 0 &&
                          group.members.map((member: User) => (
                              <Fragment key={`member-fragment-${member._id}`}>
                                <p key={member._id}>{member.nom} {member.prenom}</p>
                              </Fragment>
                          ))}
                      </div>
                      {group.admins.some((admin: User) => admin._id === user._id) && (
                        <DeleteButton Id={group._id} buttonFunction={deleteGroup} buttonName="Supprimer"></DeleteButton>
                      )}
                      {group.members.some((member: User) => member._id === user._id) && (
                        <DeleteButton Id={group._id} buttonFunction={withdrawGroup} buttonName="Se retirer"></DeleteButton>
                        )}

                    </div>
                  ))}
                </div>
              ) 
              : 
              (
                <p className="flex justify-center">Vous n'avez pas encore de groupe</p> 
              )}
            </div>
        </div>
    )
}

export default DisplayGroups;