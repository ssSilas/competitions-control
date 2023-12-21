import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/competitions.sqlite',
});

export default sequelize;
