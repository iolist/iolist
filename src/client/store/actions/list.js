import generateActions from '../../utils/store';
import requestEndpoint from '../../utils/remote';
import { showError } from './errors';

export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';
export const ADD_NEW_NODE = 'ADD_NEW_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';

const { fetchSuccess, fetchFailure, request } = generateActions({
  request: FETCH_LIST_REQUEST,
  success: FETCH_LIST_SUCCESS,
  failure: FETCH_LIST_FAILURE
});

export function fetchList(id) {
  return async (dispatch) => {
    dispatch(request());
    const result = await requestEndpoint(`/api/list/${id}`);
    if (result.error) {
      dispatch(fetchFailure(result.error));
    } else {
      dispatch(fetchSuccess(result.data));
    }
  };
}

/**
 * Adding new node (without id)
 * Add new node with temp_id -> send request to server -> get the id and update the node
 * @param {Object} newData
 */
export function addEmptyNode(tempId, newData) {
  return {
    type: ADD_NEW_NODE,
    payload: { id: tempId, temp: true, ...newData }
  };
}

/**
 * Adding new node (without id)
 * Add new node with temp_id -> send request to server -> get the id and update the node
 * @param {Object} newData
 */
export function addNode(tempId, newData) {
  return async (dispatch) => {
    dispatch(addEmptyNode(tempId, newData));
    const result = await requestEndpoint('/api/node', { method: 'POST', body: JSON.stringify(newData) });
    if (result.error) {
      return Promise.resolve(dispatch(showError(result.error)));
    }
    Promise.resolve(dispatch({
      type: UPDATE_NODE,
      id: tempId,
      temp: true,
      payload: result.data
    }));
    return Promise.resolve();
  };
}

/**
 * Update node by id
 * @param {String|Number} id
 * @param {Object} updateData
 */
export const updateNode = (id, updateData) => async (dispatch) => {
  const result = await requestEndpoint(`/api/node/${id}`, { method: 'PUT', body: JSON.stringify(updateData) });
  if (result.error) {
    return Promise.resolve(dispatch(showError(result.error)));
  }
  return Promise.resolve(dispatch({
    type: UPDATE_NODE,
    id,
    payload: updateData
  }));
};

/**
 * Delete node by id
 * @param {String|Number} id
 */
export const deleteNode = id => async (dispatch) => {
  const result = await requestEndpoint(`/api/node/${id}`, { method: 'DELETE' });
  if (result.error) {
    return Promise.resolve(dispatch(showError(result.error)));
  }
  return Promise.resolve(dispatch({
    type: DELETE_NODE,
    id
  }));
};

/**
 * Delete node by tempId
 * @param {String|Number} tempId
 */
export const deleteTempNode = tempId => ({
  type: DELETE_NODE,
  tempId
});
