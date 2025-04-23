import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import languageReducer from '../reducer/languageReducer';
import categoryReducer from '../reducer/categoryReducer';
import usersReducer from '../reducer/usersReducer';
import transactionReducer from '../reducer/transctionReducer';
import filterReducer from '../reducer/filterReducer';
import invoiceReducer from "../reducer/invoiceReducer"
import invoicefilterReducer from '../reducer/invoicefilterReducer';


const rootReducer = combineReducers({
    language: languageReducer,
    categories: categoryReducer,
    users: usersReducer,
    transactions: transactionReducer,
    invoices: invoiceReducer,
    filters: filterReducer,
    invoicefilters: invoicefilterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
