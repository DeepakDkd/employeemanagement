import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// const envFile =
//   process.env.NODE_ENV === "production" ? ".env" : ".env.development";
dotenv.config();

// const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//   dialect: 'postgres',
//   logging: false,
// });
const sequelize = new Sequelize(process.env.DATABASE_NAME!, process.env.DATABASE_USERNAME!, process.env.DATABASE_PASSWORD!, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Database connection established successfully.",
      sequelize.getDatabaseName()
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDB();
export default sequelize;
