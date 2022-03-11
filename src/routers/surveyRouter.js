import express from "express";

import {
    surveySelected,
    getSurveyCheck,
    postSurveyCheck,
    surveyResult,
} from "../controllers/surveyController";

const surveyRouter = express.Router();
surveyRouter.get("/:id(\\d+)",surveySelected);
surveyRouter.route("/:id(\\d+)/check").get(getSurveyCheck).post(postSurveyCheck);

surveyRouter.get("/:id(\\d+)/result",surveyResult);

export default surveyRouter;