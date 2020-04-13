/**
 * Universal fetch wrapper
 * @param {String} endpoint url of the endpoint
 * @param {Object} options additional options for the fetch
 *
 * @returns {Promise|Object}
 */
export default async function requestEndpoint(endpoint, options = {}) {
  try {
    const response = await window.fetch(endpoint, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    }
    return { error: { ...data, response } };
  } catch (e) {
    return { error: e };
  }
}
