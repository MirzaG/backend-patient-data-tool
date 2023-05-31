'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define(
    "Responses",
    {
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      response: DataTypes.TEXT,
      contactId: DataTypes.STRING(50),
      isSurveyCompleted: DataTypes.BOOLEAN,
      responseTime: DataTypes.DATE,
    },
    {}
  );
  Responses.associate = function(models) {
    Responses.belongsTo(models.User, { foreignKey: 'userId' });
    Responses.belongsTo(models.Question, { foreignKey: 'questionId' });
  };
  return Responses;
};