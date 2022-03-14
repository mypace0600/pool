import express from "express";
import {
    home,search
} from "../controllers/surveyController";
import {
    getJoin,
    postJoin,
    login
} from "../controllers/userController";

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/search",search);
rootRouter.get("/login",login);


export default rootRouter;