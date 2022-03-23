import express from "express";
import {
    logout,
    profile,
    myresults,
    startKakaoLogin,
    finishKakaoLogin,
    getEdit,
    postEdit
} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/logout",logout);
userRouter.get(":id(\\d+)/results",myresults);
userRouter.get("/kakao/start",startKakaoLogin);
userRouter.get("/kakao/finish",finishKakaoLogin);
userRouter.route("/edit").get(getEdit).post(postEdit);

export default userRouter;