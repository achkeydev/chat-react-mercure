import React from "react";
import DisplayNotifications from "./DisplayNotifications";
import { Notification } from "../Discussion/Discussion";
import NavBarButton from "./NavBarButton";

interface DisplayNotificationsButtonProps {
    showNotifications: () => void;
    deleteAllNotifications: () => void;
    notifications: Notification[];
}

const DisplayNotificationsButton: React.FC<DisplayNotificationsButtonProps> = ({showNotifications, notifications, deleteAllNotifications}) => {
    return(
        <div className='relative'>
            <NavBarButton buttonFunction={showNotifications} buttonName="Notifications"></NavBarButton>
            <div className='absolute w-80'>
                <DisplayNotifications notifications={notifications} showNotifications={showNotifications} deleteAllNotifications={deleteAllNotifications}></DisplayNotifications>
            </div>
        </div>
    )
}

export default DisplayNotificationsButton;