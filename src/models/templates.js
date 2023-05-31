"use strict";
module.exports = (sequelize, DataTypes) => {
  const Templates = sequelize.define(
    "Templates",
    {
      Name: DataTypes.STRING,
    },
    {}
  );
  Templates.associate = function (models) {
    Templates.hasMany(models.Question, {
      onDelete: "CASCADE",
      foreignKey: "templateId",
      as: "question",
    });
  };
  return Templates;
};
