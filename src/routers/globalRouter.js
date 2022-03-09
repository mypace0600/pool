import express from "express";
import {
    surveySearch,
    surveyList
} from "../controllers/surveyController";
import {
    login
} from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", surveyList);
globalRouter.get("/search",surveySearch);
globalRouter.get("/login",login);


export default globalRouter;