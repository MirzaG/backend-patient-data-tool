

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "patient",
      },
      verifyToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password", "verifyToken", "isAdmin"] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ["password", "verifyToken", "isAdmin"] },
        },
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Responses, {foreignKey: 'userId', as: 'user'})
  };
  return User;
};
