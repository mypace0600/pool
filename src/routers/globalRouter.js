import express from "express";
import {
    home,search
} from "../controllers/surveyController";
import {
    login
} from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.get("/search",search);
globalRouter.get("/login",login);


export default globalRouter;