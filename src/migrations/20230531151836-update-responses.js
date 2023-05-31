"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await Promise.all([
        queryInterface.addColumn("Responses", "contactId", {
          type: Sequelize.STRING(50),
          allowNull: true,
        }),
        queryInterface.addColumn("Responses", "isSurveyCompleted", {
          type: Sequelize.BOOLEAN,
          defafaultValue: false,
        }),
        queryInterface.addColumn("Responses", "responseTime", {
          type: Sequelize.DATE,
          allowNull: true,
        }),
      ]);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Responses", "contactId"),
      queryInterface.removeColumn("Responses", "isSurveyCompleted"),
      queryInterface.removeColumn("Responses", "responseTime"),
    ]);
  },
};
