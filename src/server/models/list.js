'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING
  }, {timestamps: false});
  List.associate = function(models) {
    List.hasMany(models.Node, {as: 'Nodes', foreignKey: 'list_id'});
  };
  return List;
};
