import express from "express";
import morgan from "morgan";

const PORT = 7000;
const app = express();
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();

const home = (req,res)=> {
    return res.send("<h1>home page</h1>");
}
const surveyCheck = (req,res)=>{
    return res.send("<h1>survey page</h1>");
}
const surveyResult = (req,res)=>{
    return res.send("<h1>result page</h1>");
}



app.get("/", home);
app.get("/check",surveyCheck);
app.get("/result",surveyResult);


const handleListening = ()=> 
    console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT,handleListening);