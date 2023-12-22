import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database.js';
import { currentDatetime } from '../helpers/Util.js';

class ContestModel extends Model { }
ContestModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  //resistance | distance | amount
  type: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  finishIn: {
    type: DataTypes.STRING(),
  },
  createdAt: {
    type: DataTypes.STRING(16),
    defaultValue: currentDatetime().format('YYYY-MM-DD HH:MM'),
    allowNull: false
  },
}, {
  sequelize,
  updatedAt: false,
  modelName: 'contests',
  freezeTableName: 'contests',
});

export default ContestModel;