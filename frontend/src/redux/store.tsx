import { createStore, combineReducers, Store, Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import { groupReducer } from './reducers/groupReducer';
import { RootState, UserAction, GroupAction } from './types/rootTypes';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { notificationsReducer } from './reducers/notificationReducer';

const initialState = {
    user: {},
    groups: [],
    notifications: []
};

const rootReducer: Reducer<RootState & PersistPartial, UserAction | GroupAction> = combineReducers<RootState>({
    user: userReducer,
    groups: groupReducer,
    notifications: notificationsReducer
}as any)

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'groups', 'notifications']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore<any, any, any>(persistedReducer, initialState) as unknown as Store<any, any, any>;;
const persistor = persistStore(store);
// const store = createStore(rootReducer, initialState);

export { store, persistor };
// export default store;
