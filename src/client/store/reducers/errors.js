import { DISPLAY_ERROR, CLEAR_ERROR } from '../actions/errors';

export const initialState = { errors: [] };

const errors = (state = initialState, { type, id, payload }) => {
  switch (type) {
    case DISPLAY_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          { id: `${Date.now()}_err`, ...payload }
        ]
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== id),
      };
    default:
      return state;
  }
};

export default errors;
