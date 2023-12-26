import express from "express";

import ContestController from "../controllers/contest.controller.js";

const contest_router = express.Router();

let contestController = new ContestController();

contest_router.get("/", async (req, res) => {
  try {
    const result = await contestController.getAll();
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.get("/active", async (req, res) => {
  try {
    const result = await contestController.getActive();
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.get("/by-id", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await contestController.getById(id);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.post("/", async (req, res) => {
  try {
    const { name, type } = req.body
    const result = await contestController.create(name, type);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.put("/finish", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await contestController.finish(id);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.post("/add-athlete", async (req, res) => {
  try {
    const { contestId } = req.query;
    const { name, results, cpf } = req.body;
    const athleteObj = { name, results, cpf }
    const result = await contestController.addAthlete(contestId, athleteObj);

    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.get("/athletes-by-competition", async (req, res) => {
  try {
    const { contestId } = req.query;
    const result = await contestController.listAthletesByCompetition(contestId);

    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

contest_router.get("/final-result", async (req, res) => {
  try {
    const { contestId } = req.query;
    const result = await contestController.finalResultCompetition(contestId);

    res.json(result);
  } catch (error) {
    res.status(error.status).json({ error });
  }
});

export default contest_router;
