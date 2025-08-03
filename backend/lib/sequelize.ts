import { Sequelize } from "sequelize";
import "dotenv/config";

const mysqlPassword = process.env.MYSQL_PASSWORD;

const sequelize = new Sequelize("codeblocks_db", "pfacanha", "MySQL.123!", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
