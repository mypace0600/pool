import express from "express";

import {
    surveySelected,
    surveyCheck,
    surveyResult,
} from "../controllers/surveyController";

const surveyRouter = express.Router();
surveyRouter.get("/:id(\\d+)",surveySelected);
surveyRouter.get("/:id(\\d+)/check",surveyCheck);
surveyRouter.get("/:id(\\d+)/result",surveyResult);

export default surveyRouter;