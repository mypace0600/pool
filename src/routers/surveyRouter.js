import express from "express";

import {
    getSurveyCheck,
    postSurveyCheck,
    surveyResult,
    getUpload,
    postUpload
} from "../controllers/surveyController";

const surveyRouter = express.Router();
surveyRouter.route("/:id/check").get(getSurveyCheck).post(postSurveyCheck);
surveyRouter.get("/:id(\\d+)/result",surveyResult);
surveyRouter.route("/upload").get(getUpload).post(postUpload);

export default surveyRouter;