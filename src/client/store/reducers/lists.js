import { FETCH_LISTS_REQUEST, FETCH_LISTS_SUCCESS, FETCH_LISTS_FAILURE } from '../actions/lists';

const initialState = { isFetching: true, error: null, value: null };

const lists = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_LISTS_REQUEST:
      return {
        ...initialState,
        isFetching: true
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...initialState,
        isFetching: false,
        value: payload
      };
    case FETCH_LISTS_FAILURE:
      return {
        ...initialState,
        isFetching: false,
        error: payload
      };
    default:
      return state;
  }
};

export default lists;
