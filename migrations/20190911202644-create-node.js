'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Nodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: false,
        references: {
          model: 'Lists', // name in DB
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      parent_id: {
        type: Sequelize.INTEGER,
        unique: false,
        references: {
          model: 'Nodes', // name in DB
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      previous_id: {
        type: Sequelize.INTEGER,
        unique: false
      },
      title: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      updated_at: {
        type: Sequelize.DATE
      },
      completed_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Nodes');
  }
};

