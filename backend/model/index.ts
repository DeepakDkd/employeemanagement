import sequelize from "../config/db";
import { createTaskModel } from "./taskModel";
import { createUserModel } from "./userModel";

const db = {
  sequelize,
  User: createUserModel(sequelize),
  Task:createTaskModel(sequelize),
};
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

export default db;
