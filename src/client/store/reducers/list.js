import {
  FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE, ADD_NEW_NODE, UPDATE_NODE, DELETE_NODE, TOGGLE_NODE_CHILDREN
} from '../actions/list';

const initialState = {
  isFetching: true, error: null, nodes: [], info: {}, collapsed: JSON.parse(localStorage.getItem('collapsed')) || []
};

const nodes = (state = initialState, {
  type, id, temp, payload
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
    case ADD_NEW_NODE: {
      const updatedNodes = state.nodes.map((node) => {
        if (node.previous_id === payload.previous_id) {
          return { ...node, previous_id: payload.id }; // move
        }
        return node;
      });
      updatedNodes.push(payload);
      return {
        ...state,
        nodes: updatedNodes
      };
    }

    case UPDATE_NODE: {
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          // if temp node will get new id, we also need to update previous_id in the next node:
          if (temp && node.previous_id === id) {
            return { ...node, previous_id: payload.id };
          }
          // need to update temp node:
          if (node.id === id) {
            if (temp) {
              return { ...node, ...payload, temp: false };
            }
            return { ...node, ...payload };
          }
          return node;
        })
      };
    }

    case DELETE_NODE: {
      const updatedNodes = state.nodes.map((node) => {
        if (node.previous_id === id) {
          const nodeToDelete = state.nodes.find(n => n.id === id);
          return { ...node, previous_id: nodeToDelete.previous_id }; // move
        }
        return node;
      });
      return {
        ...state,
        nodes: updatedNodes.filter(node => node.id !== id) // remove node from list with moved previous id
      };
    }

    case TOGGLE_NODE_CHILDREN: {
      let collapsedItems = state.collapsed;
      if (collapsedItems.indexOf(id) !== -1) {
        collapsedItems = collapsedItems.filter(item => item !== id);
      } else {
        collapsedItems.push(id);
      }
      localStorage.setItem('collapsed', JSON.stringify(collapsedItems));
      return {
        ...state,
        collapsed: collapsedItems
      };
    }

    default:
      return state;
  }
};

export default nodes;
