import sequelize from '../config/db';
import { createUserModel, User } from './userModel';

const db = {
  sequelize,
  User: createUserModel(sequelize),
};

export default db;
