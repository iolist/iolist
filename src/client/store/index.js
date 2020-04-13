import {
  combineReducers, createStore, applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';

import lists from './reducers/lists';
import errors from './reducers/errors';
import list from './reducers/list';

const rootReducer = combineReducers({
  lists,
  list,
  errors
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);
