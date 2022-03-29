import express from "express";

import {
    getSurveyCheck,
    postSurveyCheck,
    getUpload,
    postUpload,
    getDelete,
} from "../controllers/surveyController";

import surveyPhoto from "../middlewares";

const surveyRouter = express.Router();
surveyRouter.route("/:id([0-9a-f]{24})/check").get(getSurveyCheck).post(postSurveyCheck);
surveyRouter.route("/:id([0-9a-f]{24})/delete").get(getDelete);
surveyRouter.route("/upload").get(getUpload).post(surveyPhoto.single("photo"),postUpload);

export default surveyRouter;