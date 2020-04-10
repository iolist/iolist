'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Lists', [{
      name: 'Demo',
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Lists', null, {});
  }
};
