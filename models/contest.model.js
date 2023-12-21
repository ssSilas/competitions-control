import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database.js';
import { currentDatetime } from '../helpers/Util.js';

class Contest extends Model { }
Contest.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER(30),
    allowNull: false,
  },
  finishIn: {
    type: DataTypes.STRING(),
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: currentDatetime().format('YYYY-MM-DD HH:MM'),
    allowNull: false
  },
}, {
  sequelize,
  updatedAt: false,
  modelName: 'contest'
});

export default Contest;