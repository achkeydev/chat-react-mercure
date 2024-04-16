import { SET_GROUP, SET_NEW_GROUP } from "../actions/groupActions";
import { GroupAction } from "../types/rootTypes";
import { Group } from "../../components/Home/Home";


const initialState: Group[] = []

export const groupReducer = (state= initialState, action: GroupAction) => {
    switch (action.type) {
        case SET_GROUP:
            return action.payload
        case SET_NEW_GROUP:
            return [...state, action.payload];
        default:
            return state;
    }
} 