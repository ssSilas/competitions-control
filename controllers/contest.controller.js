import HttpStatus from "http-status-codes";
import errorObject from "../error/defaultError.js";
import { convertLiterToMilliliters, convertToCentimeter, currentDatetime, integerToSeconds } from "../helpers/Util.js";

import ContestModel from "../models/contest.model.js";
import AthleteModel from "../models/athlete.model.js";
import ContestResultModel from "../models/contestresult.model.js";
import { Sequelize } from "sequelize";

export default class ContestController {
  async getAll() {
    return await ContestModel.findAll()
  }

  async getActive() {
    return await ContestModel.findAll({
      where: { finishIn: null }
    })
  }

  async getById(id) {
    await this.checkContestExist(id)
    return await ContestModel.findOne({ where: { id } })
  }

  async create(name, type) {
    return await ContestModel.create({
      name,
      type
    })
  }

  async finish(id) {
    await this.checkContestExist(id)
    await ContestModel.update(
      {
        finishIn: currentDatetime().format('YYYY-MM-DD HH:MM')
      },
      { where: { id } }
    )
    return { success: true, message: 'Competição finalizada com sucesso.' };
  }

  async addAthlete(contestId, athleteObj) {
    const contestExist = await this.checkContestExist(contestId)

    const name = athleteObj.name.toUpperCase()
    const athleteExist = await this.checkAthleteInContest(contestId, name, athleteObj.cpf)

    const value = this.handlingTypeContest(contestExist.type, athleteObj.results)
    if (!athleteExist) {
      await this.checkCpfUsed(athleteObj.cpf)
      const athlete = await AthleteModel.create({ name: name, cpf: athleteObj.cpf })
      const keys = {
        contestfk: contestId,
        athletefk: athlete.id,
      }
      return await this.createAthleteResults(name, value, keys)
    }
    return await this.udpateAthleteResults(athleteExist, name, contestExist.type, value)
  }

  async listAthletesByCompetition(contestId) {
    await this.checkContestExist(contestId)
    return await ContestResultModel.findAll({
      attributes: ['value', 'unit'],
      where: { contestfk: contestId },
      include: [
        {
          model: ContestModel,
          attributes: ['finishIn'],
        },
        {
          model: AthleteModel,
          attributes: ['name', 'cpf'],
        },
      ],
    })
  }

  async finalResultCompetition(contestId) {
    await this.checkContestExist(contestId)
    return await ContestResultModel.findAll({
      attributes: [
        [
          Sequelize.fn('ROUND',
            Sequelize.fn('AVG',
              Sequelize.literal('value')
            ), 2), 'result'
        ]
      ],
      group: ['athletefk'],
      order: [[Sequelize.literal('result'), 'DESC']],
      where: { contestfk: contestId },
      include: [
        {
          model: ContestModel,
          attributes: ['finishIn'],
        },
        {
          model: AthleteModel,
          attributes: ['name', 'cpf'],
        },
      ],
    })
  }

  async checkContestExist(id) {
    try {
      const exist = await ContestModel.findOne({ where: { id } })
      if (!exist) {
        throw {
          message: "Competição não encontrada! :(",
          status: HttpStatus.NOT_FOUND,
        };
      }
      return exist
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }

  async checkAthleteInContest(contestId, athleteName, athleteCpf) {
    try {
      const contestFinish = await ContestModel.findOne({
        where: { id: contestId }
      })

      if (contestFinish?.finishIn) {
        throw {
          message: "A competição foi finalizada! :(",
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const exist = await ContestResultModel.findOne({
        where: { contestfk: contestId },
        include: [
          {
            model: AthleteModel,
            attributes: [],
            where: { name: athleteName }
          },
        ],
      })
      return exist
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }

  async checkCpfUsed(athleteCpf) {
    try {
      const exist = await AthleteModel.findOne({
        where: { cpf: athleteCpf }
      })

      if (exist) {
        throw {
          message: "O cpf já é utilizado por outro atleta!",
          status: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }

  async createAthleteResults(name, results, keys) {
    try {
      const response = []
      for (const result of results) {
        await ContestResultModel.create({
          contestfk: keys.contestfk,
          athletefk: keys.athletefk,
          value: result.value,
          unit: result.unit,
        })

        response.push({
          name: name,
          value: result.value,
          unit: result.unit,
        })
      }

      return { message: 'created', response }
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }

  async udpateAthleteResults(athlete, name, type, results) {
    try {
      const response = []
      if (type != 'distance') {
        for (const result of results) {
          await ContestResultModel.update(
            { value: result.value, unit: result.unit },
            {
              where: {
                contestfk: athlete.contestfk,
                athletefk: athlete.athletefk,
              }
            }
          )

          response.push({
            name: name,
            value: result.value,
            unit: result.unit
          })
        }
      } else {
        await ContestResultModel.destroy({
          where: {
            contestfk: athlete.contestfk,
            athletefk: athlete.athletefk,
          }
        })
        const keys = {
          contestfk: athlete.contestfk,
          athletefk: athlete.athletefk,
        }
        const create = await this.createAthleteResults(name, results, keys)
        response.push(create.response)
      }

      return { message: 'updated', response }
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }

  handlingTypeContest(type, results) {
    try {
      switch (type) {
        case 'resistance':
          return results.map((result) => {
            return {
              value: integerToSeconds(result.value, result.unit),
              unit: result.unit
            }
          })
        case 'distance':
          if (results.length != 3) {
            throw {
              message: "Informe 3 tentativas.",
              status: HttpStatus.NOT_FOUND,
            };
          }
          return results.map((result) => {
            return {
              value: convertToCentimeter(result.value, result.unit),
              unit: result.unit
            }
          })
        case 'amount':
          return results.map((result) => {
            return {
              value: convertLiterToMilliliters(result.value, result.unit),
              unit: result.unit
            }
          })
          break;
        default:
          break;
      }
      throw {
        message: "O tipo de competição ainda não existe em nosso sistema! :(",
        status: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }
}

