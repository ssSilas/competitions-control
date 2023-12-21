import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db/database.js';
import { currentDatetime } from '../helpers/Util.js';

class Athlete extends Model { }
Athlete.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: currentDatetime().format('YYYY-MM-DD HH:MM'),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'athlete',
  updatedAt: false
});

export default Athlete