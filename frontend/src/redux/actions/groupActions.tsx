import { Group } from "../../components/Home/Home";

export const SET_GROUP = 'SET_GROUP';
export const SET_NEW_GROUP = 'SET_NEW_GROUP';

export const setGroups = (groups: Group[]) => {
    return {
        type: SET_GROUP,
        payload: groups
    }
}

export const setNewGroup = (newGroup: Group) => {
    return {
        type: SET_NEW_GROUP,
        payload: newGroup
    }
}