import { createStore, combineReducers } from 'redux';

// Reducer para autenticação
const authReducer = (state = { token: null, id: null, name: null, role: null, avatar: null }, action) => {
        switch (action.type) {
                case 'LOGIN':
                        return {
                                token: action.token,
                                id: action.id,
                                name: action.name,
                                role: action.role,
                                avatar: action.avatar,
                        };
                case 'UPDATE':
                        return {
                                token: state.token,
                                id: state.id,
                                name: action.name,
                                role: action.role,
                                avatar: action.avatar,
                        };
                case 'UPDATE_AVATAR':
                        return {
                                token: state.token,
                                id: state.id,
                                name: state.name,
                                role: state.role,
                                avatar: action.avatar,
                        };
                case 'LOGOUT':
                        return {
                                token: null,
                                id: null,
                                name: null,
                                role: null,
                                avatar: null,
                        };
                default:
                        return state;
        }
};

const rootReducer = combineReducers({
        auth: authReducer,
});

const store = createStore(rootReducer);

export default store;