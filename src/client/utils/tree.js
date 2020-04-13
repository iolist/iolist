/**
 * Sorting for the list of nodes
 * @todo: somehow rewrite this piece of code
 * @param {Array} tree the list of nodes
 * @returns {Array}
 */
export function sortTree(tree) {
  const map = new Map();
  const lost = []; // elements with wrong or duplicated previous ID,
  tree.forEach((element) => {
    const prevId = element.previous_id;
    if (!map.has(prevId)) {
      map.set(prevId, element);
    } else {
      lost.push({ ...element, lost: true });
    }
  });
  const sortedArray = [];

  let lastId = null;
  let element;
  while (map.has(lastId)) {
    element = map.get(lastId);
    sortedArray.push(element);
    map.delete(lastId); // pop previous
    lastId = element.id;
  }
  [...map.values(), ...lost].forEach(lostVal => sortedArray.push(lostVal)); // push lost values to an array
  return sortedArray;
}

/**
 * Find nodes of one parent (null means that this is root nodes) and sort them
 * @param {Array} nodes Full list of nodes
 * @param {Number} parentId
 * @returns {Array}
 */
export function getChildNodes(nodes, parentId = null) {
  const children = nodes.reduce((result, node) => {
    if (node.parent_id === parentId) {
      result.push(node);
    }
    return result;
  }, []);
  return sortTree(children);
}
