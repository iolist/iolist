'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Nodes', [{
      id: 1,
      title: 'First node',
      list_id: 1,
      parent_id: null,
      previous_id: null,
      notes: null,
      created_at: new Date()
    }, {
      id: 2,
      title: 'Second node',
      list_id: 1,
      parent_id: null,
      previous_id: 1,
      notes: 'with notes',
      created_at: new Date()
    }, {
      id: 3,
      title: 'Child node',
      list_id: 1,
      parent_id: 2,
      previous_id: null,
      notes: null,
      created_at: new Date()
    }, {
      id: 4,
      title: 'Sub sub node',
      list_id: 1,
      parent_id: 3,
      previous_id: null,
      notes: null,
      created_at: new Date()
    }, {
      id: 5,
      title: 'Second child node',
      list_id: 1,
      parent_id: 2,
      previous_id: 3,
      notes: null,
      created_at: new Date()
    },{
      id: 6,
      title: 'Third node',
      list_id: 1,
      parent_id: null,
      previous_id: 2,
      notes: 'with notes',
      created_at: new Date()
    }, {
      id: 7,
      title: 'Sub sub node',
      list_id: 1,
      parent_id: 5,
      previous_id: null,
      notes: 'with notes',
      created_at: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Nodes', null, {});
  }
};
