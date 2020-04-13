import generateActions from '../../utils/store';
import requestEndpoint from '../../utils/remote';

export const FETCH_LISTS_REQUEST = 'FETCH_LISTS_REQUEST';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE';

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
