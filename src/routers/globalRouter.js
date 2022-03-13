import express from "express";
import {
    surveySearch,
    home
} from "../controllers/surveyController";
import {
    login
} from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.get("/search",surveySearch);
globalRouter.get("/login",login);


export default globalRouter;