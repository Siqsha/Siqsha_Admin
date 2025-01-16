import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import languageReducer from '../reducer/languageReducer';
import categoryReducer from '../reducer/categoryReducer';
import usersReducer from '../reducer/usersReducer';

const rootReducer = combineReducers({
    language: languageReducer,
    categories: categoryReducer,
    users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
