import express from "express";

import {
    getSurveyCheck,
    postSurveyCheck,
    surveyResult,
    getUpload,
    postUpload,
    getDelete,
    getResultUpload,
    postResultUpload
} from "../controllers/surveyController";

const surveyRouter = express.Router();
surveyRouter.route("/:id([0-9a-f]{24})/check").get(getSurveyCheck).post(postSurveyCheck);
surveyRouter.get("/:id([0-9a-f]{24})/result",surveyResult);
surveyRouter.route("/:id([0-9a-f]{24})/delete").get(getDelete);
surveyRouter.route("/upload").get(getUpload).post(postUpload);
surveyRouter.route("/result").get(getResultUpload).post(postResultUpload);

export default surveyRouter;