const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
  queryInterface.bulkInsert('Users', [{
    username: 'user',
    firstname: 'Myname',
    lastname: 'Mylast',
    email: 'user@dms.com',
    password: bcrypt.hashSync('amaladudu', bcrypt.genSaltSync(10)),
    roleId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    username: 'Admin',
    firstname: 'MyAdmin',
    lastname: 'MyAdminn',
    email: 'admin@dms.com',
    password: bcrypt.hashSync('adminuser', bcrypt.genSaltSync(10)),
    roleId: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface =>
  queryInterface.bulkDelete('Users', null, {})
};
