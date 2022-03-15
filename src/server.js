
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import surveyRouter from "./routers/surveyRouter";
import { localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views",process.cwd()+"/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(
    session({
        secret:"hello",
        resave:true,
        saveUninitialized:true,
    })
);


app.use(localsMiddleware);
app.use("/",rootRouter);
app.use("/user",userRouter);
app.use("/survey",surveyRouter);

export default app;
