import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database.js';
import { currentDatetime } from '../helpers/Util.js';

class AthleteModel extends Model { }
AthleteModel.init({
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
  cpf: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.STRING(16),
    defaultValue: currentDatetime().format('YYYY-MM-DD HH:MM'),
    allowNull: false
  },
}, {
  sequelize,
  updatedAt: false,
  modelName: 'athletes',
  freezeTableName: 'athletes',
});

export default AthleteModel