
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import surveyRouter from "./routers/surveyRouter";
// import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";
import fetch from "node-fetch";

const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views",process.cwd()+"/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(
    session({
        secret:process.env.COOKIE_SECRET,
        resave: false,
        aveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use(localsMiddleware);
app.use("/static",express.static("assets"));
app.use("/",rootRouter);
app.use("/user",userRouter);
app.use("/survey",surveyRouter);

export default app;
