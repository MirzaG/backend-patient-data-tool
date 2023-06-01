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
    });
  };
  return Templates;
};
