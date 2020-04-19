import { showError } from './errors';

import generateActions from '../../utils/store';
import requestEndpoint from '../../utils/remote';

export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE';
export const ADD_LIST = 'ADD_LIST';
export const DELETE_LIST = 'REMOVE_LIST';

const { fetchSuccess, fetchFailure, request } = generateActions({
  request: FETCH_LISTS_REQUEST,
  success: FETCH_LISTS_SUCCESS,
  failure: FETCH_LISTS_FAILURE
});

export function fetchLists() {
  return async (dispatch) => {
    dispatch(request());
    const result = await requestEndpoint('/api/lists');
    if (result.error) {
      dispatch(fetchFailure(result.error));
    } else {
      dispatch(fetchSuccess(result.data));
    }
  };
}

export function addNewList(newData) {
  return async (dispatch) => {
    const result = await requestEndpoint('/api/list', { method: 'POST', body: JSON.stringify(newData) });
    if (result.error) {
      return Promise.resolve(dispatch(showError(result.error)));
    }
    return Promise.resolve(dispatch({
      type: ADD_LIST,
      payload: result.data
    }));
  };
}

export const deleteList = id => async (dispatch) => {
  const result = await requestEndpoint(`/api/list/${id}`, { method: 'DELETE' });
  if (result.error) {
    return Promise.resolve(dispatch(showError(result.error)));
  }
  return Promise.resolve(dispatch({
    type: DELETE_LIST,
    id
  }));
};
