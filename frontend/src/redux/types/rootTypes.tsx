import { User, Group } from "../../components/Home/Home";
import { SET_USER} from "../actions/userActions";
import { SET_GROUP, SET_NEW_GROUP } from "../actions/groupActions";
import { SET_NOTIFICATIONS, SET_CREATE_NOTIFICATION } from "../actions/notificationActions";
import { Notification } from "../../components/Discussion/Discussion";
export interface UserAction {
    type: typeof SET_USER;
    payload: User;
  }

export interface GroupAction {
    type: typeof SET_GROUP | typeof SET_NEW_GROUP;
    payload: Group[] | Group;
}

export interface NotificationAction {
    type: typeof SET_NOTIFICATIONS | typeof SET_CREATE_NOTIFICATION;
    payload: Notification[] | Notification;
}

export interface RootState {
    user: User;
    groups: Group[];
    notifications: Notification[];
}