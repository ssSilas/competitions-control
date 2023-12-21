import { loadModels } from "../models/index.js";
import sequelize from "./database.js";

const syncDatabase = async () => {
  try {
    await sequelize.sync().then((err) => loadModels())
    console.log(" * DB Synced!");
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

async function sync() {
  await syncDatabase();
}

export default sync