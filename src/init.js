import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Survey";
import "./models/User";
import app from "./server";
import fetch from "node-fetch";

const PORT = 7000;
const handleListening = ()=> 
    console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);
app.listen(PORT,handleListening);