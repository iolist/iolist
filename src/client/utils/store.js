/**
 * Returns default actions for a thunk
 *
 * @param {String} [failure] action type
 * @param {String} [request] action type
 * @param {String} [success] action type
 * @param {String} [reset] action type
 * @returns {Function}
 */
const generateActions = function ({
  request, failure, success, reset
}) {
  const actions = {};

  if (request) {
    actions.request = () => ({
      type: request
    });
  }

  if (failure) {
    actions.fetchFailure = error => ({
      type: failure,
      payload: error
    });
  }

  if (success) {
    actions.fetchSuccess = data => ({
      type: success,
      payload: data
    });
  }

  if (reset) {
    actions.fetchReset = () => ({
      type: reset
    });
  }

  return actions;
};

export default generateActions;
