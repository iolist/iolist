import {
  FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE, ADD_NEW_NODE, UPDATE_NODE, DELETE_NODE
} from '../actions/list';

const initialState = {
  isFetching: true, error: null, nodes: [], info: {}
};

const nodes = (state = initialState, {
  type, id, tempId, payload
}) => {
  switch (type) {
    // whole list:
    case FETCH_LIST_REQUEST:
      return {
        ...initialState,
        isFetching: true
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...initialState,
        isFetching: false,
        nodes: payload.nodes,
        info: payload.list
      };
    case FETCH_LIST_FAILURE:
      return {
        ...initialState,
        isFetching: false,
        error: payload
      };

    // nodes:
    case ADD_NEW_NODE:
      return {
        ...state,
        nodes: [...nodes, payload]
      };
    case UPDATE_NODE: {
      const comparator = tempId ? node => node.temp_id === tempId : node => node.id === id;
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (comparator(node)) {
            return { ...node, payload };
          }
          return node;
        })
      };
    }
    case DELETE_NODE: {
      const comparator = tempId ? node => node.temp_id !== tempId : node => node.id !== id;
      return {
        ...state,
        nodes: state.nodes.filter(comparator)
      };
    }
    default:
      return state;
  }
};

export default nodes;
