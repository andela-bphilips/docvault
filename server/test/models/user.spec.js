import chai from 'chai';
import { User } from '../../models';
import TestData from '../TestData/TestData';

const { firstUser } = TestData;
let mockUserId;
const expect = chai.expect;

describe('User Model', () => {
  describe('Create User', () => {
    it('should create a new user', (done) => {
      User.create(firstUser).then((user) => {
        expect(user.dataValues.title).to.equal(firstUser.title);
        mockUserId = user.dataValues.id;
        done();
      });
    });

    it('should fail if username was not provided', (done) => {
      firstUser.username = '';
      User.create(firstUser).then().catch((error) => {
        expect(error.errors[0].message).to.equal(
          'Please enter a valid username'
        );
        done();
      });
    });

    it('should fail if email already exist', (done) => {
      firstUser.username = 'mynewusername';
      User.create(firstUser).then().catch((error) => {
        expect(error.errors[0].message).to.equal('Email already exist');
        expect(error.errors[0].type).to.equal('unique violation');
        done();
      });
    });

    it('should fail if email is invalid', (done) => {
      firstUser.username = 'mynewusername';
      firstUser.email = 'random@gamil';
      User.create(firstUser).then().catch((error) => {
        expect(error.errors[0].message).to.equal(
          'Please enter a valid email address!'
        );
        done();
      });
    });

    it('should fail if password is null', (done) => {
      firstUser.username = 'mynewusername';
      firstUser.email = 'testingdms@gmail.com';
      firstUser.password = null;
      User.create(firstUser).then().catch((error) => {
        expect(error.errors[0].message).to.equal('password cannot be null');
        done();
      });
    });

    describe('Update User', () => {
      const updatedUser = {};
      it('should update a user', (done) => {
        User.findById(mockUserId).then((user) => {
          user.update({ username: 'Tesing57' }).then((upUser) => {
            Object.assign(updatedUser, upUser.dataValues);
            expect(upUser.dataValues.id).to.equal(mockUserId);
            expect(user.dataValues.username).to.equal('Tesing57');
            done();
          });
        });
      });
      it('ensures password is hashed', (done) => {
        User.findById(updatedUser.id).then((user) => {
          expect(user.dataValues.id).to.equal(mockUserId);
          expect(user.dataValues.password).to.not.equal(firstUser.password);
          done();
        });
      });
    });

    describe('Delete User', () => {
      it('should delete a user', (done) => {
        User.destroy({ where: { id: mockUserId } }).then(() => {
          User.findById(mockUserId).then((res) => {
            expect(res).to.equal(null);
            done();
          });
        });
      });
    });
  });
});
