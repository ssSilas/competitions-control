import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database.js';
import { currentDatetime } from '../helpers/Util.js';

class ContestResultModel extends Model { }
ContestResultModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contestfk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'contests',
      referencesKey: 'id',
    }
  },
  athletefk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'athletes',
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
    type: DataTypes.STRING(16),
    defaultValue: currentDatetime().format('YYYY-MM-DD HH:MM'),
    allowNull: false
  },
}, {
  sequelize,
  updatedAt: false,
  modelName: 'contestresults',
  freezeTableName: 'contestresults'
});

export default ContestResultModel;