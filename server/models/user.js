import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'Enter your firstname'
          }
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'Enter your lastname'
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { args: true, msg: 'Please enter a valid username' }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Email already exist' },
        validate: { isEmail: { args: true, msg: 'Please enter a valid email address!' } }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 100],
            message: 'Your password is really short!'
          }
        }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          isInt: {
            args: true,
            message: 'Role Id must be an integer'
          }
        }
      }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE'
          });
          User.hasMany(models.Document, {
            foreignKey: 'userId',
            as: 'documents'
          });
        }
      },
      instanceMethods: {
        encryptPassword() {
          this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
        },
        validatePassword(password) {
          return bcrypt.compareSync(password, this.password);
        },
        encryptUpdatePassword(password) {
          const encryptedPassword = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(8)
          );
          return encryptedPassword;
        }
      },
      hooks: {
        beforeCreate(user) {
          user.encryptPassword();
        }
      }
    }
  );
  return User;
};
