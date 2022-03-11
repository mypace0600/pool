import express from "express";
import {
    logout,
    profile,
    myresults
} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/logout",logout);
userRouter.get(":id(\\d+)/results",myresults);
userRouter.get(":id(\\d+)",profile);

export default userRouter;