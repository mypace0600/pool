import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import surveyRouter from "./routers/surveyRouter";

const PORT = 7000;
const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/",globalRouter);
app.use("/user",userRouter);
app.use("/survey",surveyRouter);


const handleListening = ()=> 
    console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT,handleListening);