'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define('Responses', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    response: DataTypes.TEXT
  }, {});
  Responses.associate = function(models) {
    Responses.belongsTo(models.User, { foreignKey: 'userId' });
    Responses.belongsTo(models.Question, { foreignKey: 'questionId' });
  };
  return Responses;
};