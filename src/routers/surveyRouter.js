import express from "express";

import {
    getSurveyCheck,
    postSurveyCheck,
    surveyResult,
} from "../controllers/surveyController";

const surveyRouter = express.Router();
surveyRouter.route("/:id(\\d+)/check").get(getSurveyCheck).post(postSurveyCheck);
surveyRouter.get("/:id(\\d+)/result",surveyResult);

export default surveyRouter;