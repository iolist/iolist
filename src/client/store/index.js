import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import lists from './reducers/lists';
import errors from './reducers/errors';
import list from './reducers/list';

const rootReducer = combineReducers({
  lists,
  list,
  errors
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
