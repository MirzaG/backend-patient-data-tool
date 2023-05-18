

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Admin",
          lastName: "User",
          email: "admin@gmail.com",
          password: "e6e061838856bf47e1de730719fb2609", //admin@123
          isAdmin: true,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Umer",
          lastName: "Jibran",
          email: "Patient1@gmail.com",
          password: "e10adc3949ba59abbe56e057f20f883e", //"123456"
          phone: "+9212345678",
          isAdmin: false,
          role: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sarwar",
          lastName: "Ejaz",
          email: "Patient2@gmail.com",
          password: "e10adc3949ba59abbe56e057f20f883e", //"123456"
          phone: "+9211345678",
          isAdmin: false,
          role: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dr.",
          lastName: "Suleman",
          email: "Doctor1@gmail.com",
          password: "e10adc3949ba59abbe56e057f20f883e", //"123456"
          isAdmin: false,
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dr.",
          lastName: "Naseer",
          email: "Doctor2@gmail.com",
          password: "e10adc3949ba59abbe56e057f20f883e", //"123456"
          isAdmin: false,
          role: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Nasir",
          lastName: "Toufeeq",
          email: "Staff1@gmail.com",
          password: "e10adc3949ba59abbe56e057f20f883e", //"123456"
          isAdmin: false,
          role: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John",
          lastName: "David",
          email: "Staff2@gmail.com",
          password: "e10adc3949ba59abbe56e057f20f883e", //"123456"
          isAdmin: false,
          role: "staff",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
