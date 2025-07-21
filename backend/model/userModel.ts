import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUser } from '../types/user';
import { UserRole } from '../src/constants/enums/roles';


export class User extends Model<IUser> implements IUser {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole; // Default role is 'user'
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const createUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      role:{
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.USER,
      }
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
    }
  );
  
  

  return User;
};
