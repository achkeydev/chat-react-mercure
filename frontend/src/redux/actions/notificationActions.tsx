import { Notification } from "../../components/Discussion/Discussion";

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_CREATE_NOTIFICATION = 'SET_CREATE_NOTIFICATION';

export const setNotifications = (notifications: Notification[]) => {
    return {
        type: SET_NOTIFICATIONS,
        payload: notifications
    }
}

export const setCreateNotification = (notification: Notification) => {
    return {
        type: SET_CREATE_NOTIFICATION,
        payload: notification
    }
}