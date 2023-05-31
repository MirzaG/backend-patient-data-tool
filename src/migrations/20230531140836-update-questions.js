"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Questions", "templateId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: "Templates",
        key: "id",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Questions", "templateId");
  },
};
