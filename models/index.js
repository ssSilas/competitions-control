import Athlete from "./athlete.model.js"
import Contest from "./contest.model.js"
import ContestResult from "./contestresult.model.js"

export const loadModels = () => {
  Athlete.hasMany(ContestResult)

  Contest.hasMany(ContestResult)

  ContestResult.belongsTo(Contest)
  ContestResult.belongsTo(Athlete)
}