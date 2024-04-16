import { User } from '../../components/Home/Home';
import {SET_USER} from '../actions/userActions';
import { UserAction } from '../types/rootTypes';

const initialState: User = {
    _id: '',
    nom: '',
    prenom: '',
    friends: []
  };

const userReducer = (state= initialState, action:UserAction) => {
    switch (action.type) {
        case SET_USER:
            return action.payload
        default: 
            return state;
    }
}

export default userReducer;