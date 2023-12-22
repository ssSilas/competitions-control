import AthleteModel from "./athlete.model.js"
import ContestModel from "./contest.model.js"
import ContestResultModel from "./contestresult.model.js"

export const loadModels = () => {
  AthleteModel.hasMany(ContestResultModel, { foreignKey: 'athletefk' });
  ContestModel.hasMany(ContestResultModel, { foreignKey: 'contestfk' });

  ContestResultModel.belongsTo(AthleteModel, { foreignKey: 'athletefk' });
  ContestResultModel.belongsTo(ContestModel, { foreignKey: 'contestfk' })
}