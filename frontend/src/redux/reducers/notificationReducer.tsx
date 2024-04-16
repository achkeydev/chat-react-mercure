import { Notification } from "../../components/Discussion/Discussion"
import { NotificationAction } from "../types/rootTypes";
import { SET_NOTIFICATIONS, SET_CREATE_NOTIFICATION } from "../actions/notificationActions";

const initialState: Notification[] = [];

export const notificationsReducer = (state= initialState, action: NotificationAction) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return action.payload;
        case SET_CREATE_NOTIFICATION:
            return [...state, action.payload]
        default:
            return state;
    }
}