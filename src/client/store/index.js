import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import lists from './reducers/lists';

const rootReducer = combineReducers({
  lists
});


export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
