'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reminders = sequelize.define('Reminders', {
    contactId: DataTypes.STRING
  }, {});
  Reminders.associate = function(models) {
    // associations can be defined here
  };
  return Reminders;
};