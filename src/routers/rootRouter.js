import express from "express";
import {
    home,search
} from "../controllers/surveyController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin
} from "../controllers/userController";

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/search",search);
rootRouter.route("/login").get(getLogin).post(postLogin);


export default rootRouter;