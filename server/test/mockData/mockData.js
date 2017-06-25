import faker from 'faker';
import bcrypt from 'bcrypt';

export default {
  firstUser: {
    username: 'amala',
    firstname: 'eba',
    lastname: 'iyan',
    email: faker.internet.email(),
    password: 'amalaiyan',
    roleId: 1,
  },
  secondUser: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    about: faker.lorem.paragraph(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  thirdUser: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    about: faker.lorem.paragraph(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  privateDocument: {
    title: 'private document',
    content: 'private document2',
    access: 'private',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  roleDocument: {
    title: 'check role document',
    content: 'check role document1',
    access: 'role',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sampleDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 1,
    username: 'adetom',
    userRoleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editorOne: {
    username: 'kenpachi',
    fullName: 'Kenpachi Zaraki',
    email: faker.internet.email(),
    password: bcrypt.hashSync('alpine', bcrypt.genSaltSync(10)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editorTwo: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('alpine', bcrypt.genSaltSync(10)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidUserDetails: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: 'myemail@yahoo',
    password: faker.internet.password(),
    roleId: 2
  },
  invalidToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE0OTM2MjQ5MTcsImV4cCI6MTQ5MzcxMTMxN30.A3dy4bPUEa3QsML03UKDjqC9wcmAjV0ub8aWu1niaL',
  roleOne: {
    title: 'regular',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  admin: {
    username: 'admin',
    password: 'alpine'
  },
  regularUser: {
    username: 'montaro',
    password: 'montaro'
  }
};