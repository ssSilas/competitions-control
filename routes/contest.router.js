import express from "express";

import ContestController from "../controllers/contest.controller.js";

const contest_router = express.Router();

let cc = new ContestController();




export default contest_router;
