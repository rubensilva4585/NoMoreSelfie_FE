import { createStore, combineReducers } from 'redux';

// Reducer para autenticação
const authReducer = (state = { token: null, id: null, name: null, role: null }, action) => {
        switch (action.type) {
                case 'LOGIN':
                        return {
                                token: action.token,
                                id: action.id,
                                name: action.name,
                                role: action.role,
                        };
                case 'LOGOUT':
                        return {
                                token: null,
                                id: null,
                                name: null,
                                role: null,
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