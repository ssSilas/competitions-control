import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database.js';
import { currentDatetime } from '../helpers/Util.js';

class ContestResult extends Model { }
ContestResult.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contestfk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'contest',
      referencesKey: 'id',
    }
  },
  athletefk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'athlete',
      referencesKey: 'id'
    }
  },
  value: {
    type: DataTypes.INTEGER(30),
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: currentDatetime().format('YYYY-MM-DD HH:MM'),
    allowNull: false
  },
}, {
  sequelize,
  updatedAt: false,
  modelName: 'contestresult'
});

export default ContestResult;