
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import surveyRouter from "./routers/surveyRouter";


const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views",process.cwd()+"/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/",globalRouter);
app.use("/user",userRouter);
app.use("/survey",surveyRouter);

export default app;
