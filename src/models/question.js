'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      templateId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      type: DataTypes.STRING,
      options: DataTypes.JSONB,
    },
    {}
  );
  Question.associate = function (models) {
    Question.hasMany(models.Responses, {
      foreignKey: "questionId",
      as: "question",
    });
    Question.belongsTo(models.Templates, { foreignKey: "templateId" });
  };
  return Question;
};