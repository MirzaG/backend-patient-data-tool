'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    text: DataTypes.TEXT,
    type: DataTypes.STRING,
    options: DataTypes.JSONB
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Responses, {foreignKey: 'questionId', as: 'question'})
  };
  return Question;
};