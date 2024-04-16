import React from "react";
import DeleteAllButton from "./DeleteAllButton";
import { Notification } from "../Discussion/Discussion";

interface DisplayNotificationsProps {
    showNotifications: () => void;
    deleteAllNotifications: () => void;
    notifications: Notification[];
}

const DisplayNotifications: React.FC<DisplayNotificationsProps> = ({notifications, deleteAllNotifications}) => {
    return(
        <div>
          {notifications.length > 0 && (
            <div className="bg-indigo-950 p-4 text-white h-64 text-sm overflow-auto space-y-4 rounded-lg">
              {notifications.map(notification => {
                return <p key={notification._id}>{notification.message}</p>
              })}
              <DeleteAllButton buttonFunction={deleteAllNotifications} buttonName="Supprimer"></DeleteAllButton>
            </div>
          )}
        </div>
    ) 
}

export default DisplayNotifications;