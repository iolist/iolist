'use strict';
module.exports = (sequelize, DataTypes) => {
  const Node = sequelize.define('Node', {
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Nodes', // name in DB
        key: 'id',
      }
    },
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Nodes', // name in DB
        key: 'id',
      }
    },
    previous_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    notes: DataTypes.STRING,
    updated_at: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    indexes: [
      {
        name: 'parent_id',
        fields: ['parent_id']
      },
      {
        name: 'list_id',
        fields: ['list_id']
      }
    ]
  });
  Node.associate = function(models) {
    // associations can be defined here
    Node.belongsTo(models.List, {foreignKey: 'list_id', unique: false});
  };

  return Node;
};
