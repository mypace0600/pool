import express from "express";
import {
    logout,
    myresults,
    startKakaoLogin,
    finishKakaoLogin,
    getEdit,
    postEdit
} from "../controllers/userController";
import { protectorMiddleware,
    publicOnlyMiddleware,
  } from "../middlewares";

const userRouter = express.Router();
userRouter.get("/logout",protectorMiddleware,logout);
userRouter.get(":id(\\d+)/results",myresults);
userRouter.get("/kakao/start",publicOnlyMiddleware,startKakaoLogin);
userRouter.get("/kakao/finish",publicOnlyMiddleware,finishKakaoLogin);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);

export default userRouter;