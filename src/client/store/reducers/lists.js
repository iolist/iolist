import {
  FETCH_LISTS_REQUEST, FETCH_LISTS_SUCCESS, FETCH_LISTS_FAILURE,
  ADD_LIST, DELETE_LIST
} from '../actions/lists';

const initialState = { isFetching: true, error: null, lists: null };

const lists = (state = initialState, { type, payload, id }) => {
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
    case ADD_LIST:
      return {
        value: [
          ...state.value,
          payload
        ]
      };
    case DELETE_LIST:
      return {
        value: state.value.filter(list => list.id !== id)
      };
    default:
      return state;
  }
};

export default lists;
