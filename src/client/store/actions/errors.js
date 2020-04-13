export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const showError = error => ({
  type: DISPLAY_ERROR,
  payload: error
});

export const clearError = id => ({
  type: CLEAR_ERROR,
  id
});
