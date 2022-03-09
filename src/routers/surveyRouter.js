import express from "express";

import {
    surveySelected,
    surveyCheck,
    surveyResult,
} from "../controllers/surveyController";

const surveyRouter = express.Router();
surveyRouter.get("/:id",surveySelected);
surveyRouter.get("/:id/check",surveyCheck);
surveyRouter.get("/:id/result",surveyResult);

export default surveyRouter;