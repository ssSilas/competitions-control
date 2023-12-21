import HttpStatus from "http-status-codes";
import errorObject from "../error/defaultError.js";
import { currentDatetime } from "../helpers/Util.js";

import Contest from "../models/contest.model.js";

export default class ContestController {
  async getAll() {
    return await Contest.findAll()
  }

  async getActive() {
    return await Contest.findAll({
      where: {
        finishIn: null
      }
    })
  }

  async getById(id) {
    await this.checkContestExist(id)
    return await Contest.findOne({ where: { id } })
  }

  async create(name, type) {
    return await Contest.create({
      name,
      type
    })
  }

  async finish(id) {
    await this.checkContestExist(id)
    await Contest.update(
      {
        finishIn: currentDatetime().format('YYYY-MM-DD HH:MM')
      },
      { where: { id } }
    )
    return { success: true, message: 'Competição finalizada com sucesso.' };
  }

  async checkContestExist(id) {
    try {
      const exist = await Contest.findOne({ where: { id } })
      if (!exist) {
        throw {
          message: "Competição não encontrada!",
          status: HttpStatus.NOT_FOUND,
        };
      }
      return true
    } catch (error) {
      console.log(error)
      throw errorObject(error);
    }
  }
}

